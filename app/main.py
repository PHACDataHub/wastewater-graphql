import strawberry
import json
from fastapi import FastAPI, status, Header, Depends, Query
from fastapi.responses import JSONResponse
from app.models import InfobaseTrend, measures, sites
from strawberry.fastapi import GraphQLRouter
from pydantic import BaseModel, Field
from typing import Annotated
from sqlmodel import Field, Session, SQLModel, create_engine, select
from dotenv import load_dotenv
import os
from fastapi_pagination import Page, add_pagination
from fastapi_pagination.ext.sqlmodel import paginate
from typing import TypeVar
from fastapi_pagination.customization import CustomizedPage, UseParamsFields
from fastapi_pagination import set_params, set_page
from fastapi_pagination.cursor import CursorPage, CursorParams

load_dotenv()

DB_DATABASE = os.getenv("DB_DATABASE")
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

connection_string = f"mssql+pyodbc://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_DATABASE}?driver=SQL+Server"


def get_session():
    with Session(engine) as session:
        yield session

engine = create_engine(connection_string)
SessionDep = Annotated[Session, Depends(get_session)]

class UserMetadata(BaseModel):
    user: str
    groups: list[str] = Field(list)


async def get_current_user(
    rstudio_connect_credentials: Annotated[str | None, Header()] = None
) -> UserMetadata | None:
    """
    Get the user metadata from the RStudio-Connect-Credentials header and then
    parse the data into a UserMetadata object.
    """
    if rstudio_connect_credentials is None:
        return None
    user_meta_data = json.loads(rstudio_connect_credentials)
    return UserMetadata(**user_meta_data)

@strawberry.type
class Qquery:
    @strawberry.field
    def infobase_trend(self) -> list[InfobaseTrend]:
        # call read_InfobaseTrend endpoint to get data
        session = next(get_session())
        infobase_trend_data = session.exec(select(InfobaseTrend).limit(10)).all()
        return infobase_trend_data
    @strawberry.field
    def measures(self) -> list[measures]:
        session = next(get_session())
        measures_data = session.exec(select(measures).limit(10)).all()
        return measures_data
    @strawberry.field
    def sites(self) -> list[sites]:
        session = next(get_session())
        sites_data = session.exec(select(sites).limit(10)).all()
        return sites_data


schema = strawberry.Schema(query=Qquery)
graphql_app = GraphQLRouter(schema)
app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

@app.get("/hello")
async def get_hello(user=Depends(get_current_user)) -> JSONResponse:
    """
    Use FastAPIs dependency injection system to get the current user.
    """
    if user.hasattr("groups"):
        return user
    else:
        return {"message": "unauth"}


@app.get("/InfobaseTrend/", response_model=list[InfobaseTrend])
def read_InfobaseTrend(session: SessionDep, offset: int = 0, limit: int = 100) -> list[InfobaseTrend]:
    return session.exec(select(InfobaseTrend).order_by(InfobaseTrend.Location).offset(offset).limit(limit)).all()

@app.get("/sites/", response_model=list[sites])
def read_sites(session: SessionDep, offset: int = 0, limit: int = 100) -> list[sites]:
    return session.exec(select(sites).limit(limit)).all()

@app.get("/measures/")
def read_measures(session: SessionDep, offset: int = 0, limit: int = 100) -> list[measures]:
    data = session.exec(select(measures).limit(limit))
    return data


# add_pagination(app)

# T = TypeVar("T")

# CustomPage = CustomizedPage[
#     Page[T],
#     UseParamsFields(
#         # change default size to be 5, increase upper limit to 1 000
#         size=Query(1000, ge=1, le=1_000),
#     ),
# ]

# @app.get("/measures/", response_model=CursorPage[measures])
# def list_measures(
#     session: SessionDep,
#     size: int = 100
# ):
#     set_page(CursorPage[measures])
#     params = CursorParams(size=size, cursor=None)
#     set_params(params)
#     return paginate(session, select(measures).order_by(measures.measureRepID))


# @app.get("/measures/", response_model=CustomPage[measures])
# def list_measures(session: SessionDep) -> CustomPage[measures]:
#     return paginate(session, select(measures).order_by(measures.measureRepID))

# @app.get("/measures/", response_model=Page[measures])
# def list_measures(session: SessionDep) -> Page[measures]:
#     return paginate(session, select(measures).order_by(measures.measureRepID))
