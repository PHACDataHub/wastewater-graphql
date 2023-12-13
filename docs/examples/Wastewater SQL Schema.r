# Databricks notebook source
###### This code contains  the up to date version of the ODM schema that is in production.

# COMMAND ----------

###### Aggregate tables - Derived based on ODM table

# COMMAND ----------

# DBTITLE 1,allSites - The table that contains information about ww daily signal average per replicate level assocaited with a given site
  allSites {
    collDT
    name
    healthReg
    measID
    fractionID
    dataID
    valavg
    sampleID
    MA7
    confidence
    siteID
  }



# COMMAND ----------

# DBTITLE 1,allSitesAdj- The table that contains information about the adjusted (based on Quality Flag) ww daily signal average per replicate level assocaited with a given site
   allSitesAdj {
    collDT
    name
    healthReg
    measID
    fractionID
    dataID
    valavg
    sampleID
    MA7
    confidence
    siteID
  }

# COMMAND ----------

###### ODM tables

# COMMAND ----------

# DBTITLE 1,Dataset - A report table for capturing details about data’s parental data set and data custodians. Supplying attribution for data collectors.
datasets {
    parDatasetID
    datasetID
    name
    license
    descr
    refLink
    langID
    funderCont
    custodyCont
    funderID
    custodyID
    notes
  }

# COMMAND ----------

# DBTITLE 1,Infobase - subset of allsite table that is publishing on public health infobase
 Infobase {
    Date
    Location
    region
    measureid
    fractionid
    viral_load
    seven_day_rolling_avg
    pruid
  }

# COMMAND ----------

# DBTITLE 1,InfobaseTrend- The table that contains information about the trend flag assocaited with a given site

  InfobaseTrend {
    fractionid
    region
    Location
    measureid
    LatestTrend
    pruid
  }

# COMMAND ----------

# DBTITLE 1, measures - The table that contains information and details about a given measure adapt from verson 1 documentation
 
  measures {
    measureRepID
    protocolID
    sampleID
    purposeID
    polygonID
    siteID
    datasetID
    measureSetRepID
    compartment
    specimenID
    fraction
    group
    class
    measure
    value
    unit
    aggregation
    nomenclature
    index
    measureLic
    reportable
    organizationID
    contactID
    refLink
  }

# COMMAND ----------

# DBTITLE 1,samples - The table that contains information about a sample. A sample is defined as a representative volume of wastewater (or other forms of water or liquid), air, or surface area taken from a site. Samples can be combined, split, stored and reused.

  samples {
    sampleID
    protocolID
    organizationID
    contactID
    siteID
    purposeID
    saMaterial
    datasetID
    origin
    repType
    collType
    collPer
    collNum
    pooled
    collDT
    collDTStart
    collDTEnd
    sentDate
    recDate
    reportable
    lastEdited
    notes
  }

# COMMAND ----------

# DBTITLE 1,qualityReports - The table for recording the various quality metrics and indicators for samples and measures.
 qualityReports {
    quality
    measureRepID
    sampleID
    measureSetRepID
    qualityFlag
    severity
    notes
  }

# COMMAND ----------

# DBTITLE 1,sites - The table that contains information about a site; the location where an environmental sample was taken. The site of an eviromental sample. Information in the site table does not regularly change. Consider using the MeasureReport table if the infomation changes often.
  sites {
    parSiteID
    siteID
    datasetID
    polygonID
    siteType
    sampleShed
    addressID
    organizationID
    contactID
    name
    descr
    repOrg1
    repOrg2
    healthReg
    popServ
    geoLat
    geoLong
    geoEPSG
    lastEdited
    notes
  }

# COMMAND ----------

# DBTITLE 1,StandardCurve - Table that contains the std curve information along with Lot number that serve for quantification

  StandardCurve {
    sampleID
    N2_Curve_ID
    PMMV_Curve_ID
    CDCA_Curve_ID
    CDCB_Curve_ID
    RSVA_Curve_ID
    RSVB_Curve_ID
    LotNumber
  }

# COMMAND ----------

###### ODM Dictionary tables - Theses tables are pulled from the ODM working group osfhome or page

# COMMAND ----------

# DBTITLE 1,parts - Look up table containing all parts in of the data model. Contains all parts, including self-referential parts.


  parts {
    partID
    partLabel
    partType
    shortName
    partDesc
    partInstr
    domain
    specimenSet
    compartmentSet
    group
    class
    nomenclature
    ontologyRef
    latExp
    mmaSet
    unitSet
    aggreationScale
    aggregationSet
    qualitySet
    missingnessSet
    status
    changes
    protocolSteps
    protocolStepsRequired
    protocolStepsOrder
    protocolRelationships
    protocolRelationshipsRequired
    protocolRelationshipsOrder
    measures
    measuresRequired
    measuresOrder
    measureSets
    measureSetsRequired
    measureSetsOrder
    datasets
    datasetsRequired
    datasetsOrder
    sites
    sitesRequired
    sitesOrder
    samples
    samplesRequired
    samplesOrder
    addresses
    addressesRequired
    addressesOrder
    contacts
    contactsRequired
    contactsOrder
    organizations
    organizationsRequired
    organizationsOrder
    instruments
    instrumentsRequired
    instrumentsOrder
    polygons
    polygonsRequired
    polygonsOrder
    languages
    languagesRequired
    languagesOrder
    translations
    translationsRequired
    translationsOrder
    parts
    partsRequired
    partsOrder
    sets
    setsRquired
    setsOrder
    qualityReports
    qualityReportsRequired
    qualityReportsOrder
    sampleRelationships
    sampleRelationshipsRequired
    sampleRelationshipsOrder
    protocols
    protocolsRequired
    protocolsOrder
    countries
    countriesRequired
    countriesOrder
    zones
    zonesRequired
    zonesOrder
    refLink
    dataType
    minValue
    maxValue
    minLength
    maxLength
  }
 
  

# COMMAND ----------

# DBTITLE 1,countries - Look up table for the possible country inputs.
 
  countries {
    isoCode
    isoCodeX
    numCode
    tld
    nameEngl
    nameOffical
    sovereignity
    countryExonym
    capitalExonym
    countryEndonym
    capitalEndonym
    langScript
    phone
    utc
    utcDST
  }

# COMMAND ----------

sets {
    setID
    setType
    partID
    partLabel
    status
    changes
    notes
  }


# COMMAND ----------

# DBTITLE 1,translations - Look up table for translations of the description, label, and instruction for all parts. The default language if a translation is not specified is English.

  translations {
    lang
    part
    partLabel
    partDesc
    partInstr
    changes
    notes
  }
 


# COMMAND ----------

# DBTITLE 1,zones - Look up table for the possible sub-national region or zone inputs.
 zones {
    isoCode
    isoZone
    zoneName
  }

# COMMAND ----------

# DBTITLE 1,languages -  Look up table for all languages, used to give structure to the translation table.
 languages {
    lang
    langFam
    langName
    natName
    ISO6391
    ISO6392B
    ISO6392T
    ISO6393
    ISO6396
    changes
    notes
  }
