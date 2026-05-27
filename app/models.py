import strawberry
from sqlmodel import Field, SQLModel
from datetime import datetime

@strawberry.type
class InfobaseTrend(SQLModel, table=True, schema="wastewater"):
    __table_args__ = {"schema": "wastewater"} 
    Location: str = Field(primary_key=True)
    latestTrends: str
    measure: str
    pruid: str
    t_low: float
    t_high: float
    LatestLevel: str
    Grouping: str
    City: str
    Province: str
    Country: str
    Viral_Activity_Level: str

@strawberry.type
class measures(SQLModel, table=True, schema="wastewater"):
    __table_args__ = {"schema": "wastewater"}
    measureRepID: str = Field(primary_key=True)
    protocolID: str | None
    sampleID: str
    purposeID: str | None
    polygonID: str | None
    siteID: str
    datasetID: str
    measureSetRepID: str | None
    aDateStart: datetime | None
    aDateEnd: datetime | None
    reportDate: datetime | None
    compartment: str | None
    specimenID: str | None
    fraction: str | None
    group: str | None
    # class_: str | None
    measure: str | None
    value: str | None
    unit: str | None
    aggregation: str | None
    nomenclature: str | None
    index: int | None
    measureLic: str | None
    reportable: int | None
    organizationID: str | None
    contactID: str | None
    refLink: str | None
    lastEdited: datetime | None

@strawberry.type
class sites(SQLModel, table=True, schema="wastewater"):
    __table_args__ = {"schema": "wastewater"}
    siteID: str = Field(primary_key=True)
    parSiteID: str | None
    datasetID: str | None
    polygonID: str | None
    siteType: str | None
    sampleShed: str | None
    addressID: str | None
    organizationID: str | None
    contactID: str | None
    name: str | None
    descr: str | None
    repOrg1: str | None
    repOrg2: str | None
    healthReg: str | None
    popServ: int | None
    geoLat: str | None
    geoLong: str | None
    geoEPSG: str | None
    lastEdited: datetime | None
    notes: str | None

@strawberry.type
class Samples(SQLModel, table=True):
    sampleID: str = Field(primary_key=True)
    protocolID: str | None
    organizationID: str | None
    contactID: str | None
    siteID: str | None
    purposeID: str | None
    saMaterial: str | None
    datasetID: str | None
    origin: str | None
    repType: str | None
    collType: str | None
    collPer: float | None
    collNum: int | None
    pooled: int | None
    collDT: datetime | None
    collDTStart: datetime | None
    collDTEnd: datetime | None
    sentDate: datetime | None
    recDate: datetime | None
    reportable: str | None
    lastEdited: datetime | None
    notes: str | None

@strawberry.type
class Datasets(SQLModel, table=True):
    datasetID: str = Field(primary_key=True)
    parDatasetID: str | None
    name: str | None
    license: str | None
    descr: str | None
    refLink: str | None
    langID: int | None
    funderCont: str | None
    custodyCont: str | None
    funderID: str | None
    custodyID: str | None
    notes: str | None


@strawberry.type
class Parts(SQLModel, table=True):
    partID: str = Field(primary_key=True)
    partLabel: str | None
    partType: str | None
    shortName: str | None
    partDesc: str | None
    partInstr: str | None
    domain: str | None
    specimenSet: str | None
    compartmentSet: str | None
    group: str | None
    # class_: Optional[str] = Field(default=None, alias="class")
    nomenclature: str | None
    ontologyRef: str | None
    latExp: str | None
    mmaSet: str | None
    unitSet: str | None
    aggreationScale: str | None
    aggregationSet: str | None
    qualitySet: str | None
    missingnessSet: str | None
    status: str | None
    changes: str | None
    protocolSteps: str | None
    protocolStepsRequired: str | None
    protocolStepsOrder: int | None
    protocolRelationships: str | None
    protocolRelationshipsRequired: str | None
    protocolRelationshipsOrder: int | None
    measures: str | None
    measuresRequired: str | None
    measuresOrder: int | None
    measureSets: str | None
    measureSetsRequired: str | None
    measureSetsOrder: int | None
    datasets: str | None
    datasetsRequired: str | None
    datasetsOrder: int | None
    sites: str | None
    sitesRequired: str | None
    sitesOrder: int | None
    samples: str | None
    samplesRequired: str | None
    samplesOrder: int | None
    addresses: str | None
    addressesRequired: str | None
    addressesOrder: int | None
    contacts: str | None
    contactsRequired: str | None
    contactsOrder: int | None
    organizations: str | None
    organizationsRequired: str | None
    organizationsOrder: int | None
    instruments: str | None
    instrumentsRequired: str | None
    instrumentsOrder: int | None
    polygons: str | None
    polygonsRequired: str | None
    polygonsOrder: int | None
    languages: str | None
    languagesRequired: str | None
    languagesOrder: int | None
    translations: str | None
    translationsRequired: str | None
    translationsOrder: int | None
    parts: str | None
    partsRequired: str | None
    partsOrder: int | None
    sets: str | None
    setsRquired: str | None
    setsOrder: int | None
    qualityReports: str | None
    qualityReportsRequired: str | None
    qualityReportsOrder: int | None
    sampleRelationships: str | None
    sampleRelationshipsRequired: str | None
    sampleRelationshipsOrder: int | None
    protocols: str | None
    protocolsRequired: str | None
    protocolsOrder: int | None
    countries: str | None
    countriesRequired: str | None
    countriesOrder: int | None
    zones: str | None
    zonesRequired: str | None
    zonesOrder: int | None
    refLink: str | None
    dataType: str | None
    minValue: str | None
    maxValue: str | None
    minLength: int | None
    maxLength: int | None

@strawberry.type
class QualityReports(SQLModel, table=True):
    quality: str = Field(primary_key=True)
    measureRepID: str | None
    sampleID: str | None
    measureSetRepID: str | None
    qualityFlag: str | None
    severity: str | None
    notes: str | None

@strawberry.type
class Countries(SQLModel, table=True):
    isoCode: str = Field(primary_key=True)
    isoCodeX: str | None
    numCode: str | None
    tld: str | None
    nameEngl: str | None
    nameOffical: str | None
    sovereignity: str | None
    countryExonym: str | None
    capitalExonym: str | None
    countryEndonym: str | None
    capitalEndonym: str | None
    langScript: str | None
    phone: str | None
    utc: str | None
    utcDST: str | None

@strawberry.type
class Translations(SQLModel, table=True):
    lang: str = Field(primary_key=True)
    part: str | None
    partLabel: str | None
    partDesc: str | None
    partInstr: str | None
    changes: str | None
    notes: str | None

@strawberry.type
class Languages(SQLModel, table=True):
    lang: str = Field(primary_key=True)
    langFam: str | None
    langName: str | None
    natName: str | None
    ISO6391: str | None
    ISO6392B: str | None
    ISO6392T: str | None
    ISO6393: str | None
    ISO6396: str | None
    changes: str | None
    notes: str | None

@strawberry.type
class Sets(SQLModel, table=True):
    setID: str = Field(primary_key=True)
    setType: str | None
    partID: str | None
    partLabel: str | None
    status: str | None
    changes: str | None
    notes: str | None

@strawberry.type
class StandardCurve(SQLModel, table=True):
    sampleID: str = Field(primary_key=True)
    N2_Curve_ID: str | None
    PMMV_Curve_ID: str | None
    CDCA_Curve_ID: str | None
    CDCB_Curve_ID: str | None
    RSVA_Curve_ID: str | None
    RSVB_Curve_ID: str | None
    LotNumber: str | None

@strawberry.type
class WastewaterAtEpiYearWeek(SQLModel, table=True):
    Location: str = Field(primary_key=True)
    SiteName: str | None
    City: str | None
    Province: str | None
    Country: str | None
    EpiYear: float | None
    EpiWeek: float | None
    Week_start: datetime | None
    measure: str | None
    w_avg: float | None
    min: float | None
    max: float | None
    Population_Coverage: float | None
    pruid: str | None

@strawberry.type
class wastewatermpox(SQLModel, table=True):
    Location: str = Field(primary_key=True)
    EpiYear: str | None
    EpiWeek: str | None
    Week_start: str | None
    mpoxG2R: str | None
    mpoxG2RTotal: str | None
    g2r_perc: str | None
    g2r_positive_epiweek: str | None
    g2r_label: str | None
    Grouping: str | None

@strawberry.type
class allSites(SQLModel, table=True):
    sampleID: str = Field(primary_key=True)
    collDT: datetime | None
    name: str | None
    healthReg: str | None
    measure: str | None
    fraction: str | None
    datasetID: str | None
    valavg: float | None
    MA7: float | None
    sd_avg: float | None
    Tests_performed: str | None
    siteID: str | None
    Province: str | None
    reportDate: datetime | None

@strawberry.type
class allSitesAdj(SQLModel, table=True):
    sampleID: str = Field(primary_key=True)
    collDT: datetime | None
    name: str | None
    healthReg: str | None
    measure: str | None
    fraction: str | None
    datasetID: str | None
    valavg: float | None
    MA7: float | None
    sd_avg: float | None
    Tests_performed: str | None
    siteID: str | None
    Province: str | None

@strawberry.type
class Infobase(SQLModel, table=True):
    Date: datetime | None
    Location: str = Field(primary_key=True)
    region: str | None
    measureid: str | None
    fractionid: str | None
    viral_load: float | None
    seven_day_rolling_avg: float | None
    pruid: int | None

@strawberry.type
class Zones(SQLModel, table=True):
    isoCode: str = Field(primary_key=True)
    isoZone: str | None
    zoneName: str | None