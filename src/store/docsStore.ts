import { RefObject, useRef } from 'react';
import { create } from 'zustand'
import { DocsLinkItem, DocsLinkSubsections, SearchDoc, ScrollRef } from './types';


export interface DocsState {
  selectedSection: string;
  selectedSubSection: string;
  selectedSubSections: string[];
  articles: DocsLinkItem[];
  subsections: DocsLinkSubsections;
  searchDocs: {[docName: string]: SearchDoc};
  subSectionRefs: {[subSection: string]: ScrollRef};
  docsNavRefs: {[subSection: string]: ScrollRef},
  setSelectedSection: (updatedSection: string) => void;
  setSelectedSubSection: (updatedSubSection: string) => void;
  setSelectedSubSections: (updatedSection: string) => void;
  setArticles: (updatedArticles: DocsLinkItem[]) => void;
  setSubSections: (updatedSubSections: DocsLinkSubsections) => void;
  setSearchDocs: (updatedSearchDocs: SearchDoc) => void;
  setSubSectionRefs: (updatedRefs: {[subSection: string]: ScrollRef}) => void;
  setDocsNavRefs: (updatedDocsNavRefs: {[subSection: string]: ScrollRef}) => void;
}


const useDocsStore = create<DocsState>()((set, get) => {

    const initialSection = "Introduction";
    const initialSubSection = "Welcome";

    const articles = [
      {
          sectionName: "Introduction",
          sectionPath: "/docs/Introduction",
          sectionSubsections: [
              "Welcome",
              "System requirements",
              "Setup",
              "Development setup"
          ]
      },
      {
          sectionName: "Philosophy",
          sectionPath: "/docs/Philosophy",
          sectionSubsections: [
                "What is performance testing?",
                "Why Hedra?",
                "Guiding principles",
                "Workflows as graphs",
                "Tests as workflows",
                "Where Hedra comes in"
          ]
  
      },
      {
          sectionName: "Core Concepts",
          sectionPath: "/docs/CoreConcepts",
          sectionSubsections: [
                "Introduction to Hooks",
                "Introduction to Stages",
                "Introduction to Graphs",
                "Introduction to Projects",
                "Engines, Personas, Optimizers, and Reporters",
                "Putting it all together",
          ]
  
      },
      {
          sectionName: "Command Line",
          sectionPath: "/docs/command_line",
          sectionSubsections: [
              "CLI Overview",
              "Graph commands",
              "Project commands",
              "Plugin commands",
              "Cloud commands",
              "Helper commands"
          ]
  
      },
      {
          sectionName: "Working with Graphs",
          sectionPath: "/docs/working_with_graphs",
          sectionSubsections: [
              "My first graph",
              "Validating graph changes",
              "Converting actions to tasks",
              "Checking results",
              "Adding an optimizer",
              "Using multiple enignes",
              "Checkpointing results",
              "Cross-graph communication",
              "Using multiple reporters",
              "Creating a graph from template",
          ]
  
      },
      {
          sectionName: "Working with Projects",
          sectionPath: "/docs/working_with_projects",
          sectionSubsections: [
              "Initializing a project",
              "Hedra config and .hedra.json",
              "Referencing graphs by name",
              "Getting a project from Github",
              "Checking the project",
              "Syncing updates",
          ]
  
      },
      {
          sectionName: "Projects",
          sectionPath: "/docs/projects",
          sectionSubsections: [
              "Projects Overview",
              "Directory structure",
              "Config options for .hedra.json",
              "Remote projects and project management"
          ]
  
      },
      {
          sectionName: "Graphs",
          sectionPath: "/docs/graphs",
          sectionSubsections: [
              "Graphs overview",
              "Graph CLI commands",
              "Graph requirements",
              "Graph lifecycle",
              "Virtual Users and concurrency",
              "CPUs and graph resource provisioning",
              "Gotchas"
          ]
  
      },
      {
          sectionName: "Stages",
          sectionPath: "/docs/stages",
          sectionSubsections: [
              "Stages overview",
              "Stage requirements",
              "Internal vs Public Stages",
              "Stage lifecycle",
              "Stage state and state isolation",
              "Analyze",
              "Checkpoint",
              "Complete",
              "Error",
              "Execute",
              "Idle",
              "Optimize",
              "Setup",
              "Submit",
              "Teardown",
              "Validate",
              "Wait"
          ]
  
      },
      {
          sectionName: "Hooks",
          sectionPath: "/docs/hooks",
          sectionSubsections: [
              "Hooks overview",
              "Why async functions?",
              "Internal vs external hooks",
              "Hook lifecycle",
              "Dynamic vs static hooks",
              "Action",
              "After",
              "Before",
              "Channel",
              "Check",
              "Context",
              "Depends",
              "Event",
              "Metric",
              "Restore",
              "Save",
              "Setup",
              "Task",
              "Teardown",
              "Validate",
          ]
  
      },
      {
          sectionName: "Engines",
          sectionPath: "/docs/engines",
          sectionSubsections: [
              "Engines overview",
              "Engine exeuction lifecycle",
              "Client calls vs optimized calls",
              "Hook overhead",
              "GraphQL",
              "GraphQL-HTTP2",
              "HTTP",
              "HTTP2",
              "Playwright",
              "UDP",
              "Websocket"
          ]
  
      },
      {
          sectionName: "Personas",
          sectionPath: "/docs/personas",
          sectionSubsections: [
              "Persona overview",
              "Persona execution lifecycle",
              "Batched Persona",
              "Constant Arrival Rate Persona",
              "Constant Spawn Rate Persona",
              "Default Persona",
              "Ramped Internal Persona",
              "Sequenced Persona",
              "Weighted Selection Persona"
          ]
  
      },
      {
          sectionName: "Reporters",
          sectionPath: "/docs/reporters",
          sectionSubsections: [
              "Reporters Overview",
              "Reporter Lifecycle",
              "AWS Lambda",
              "AWS Timestream",
              "BigQuery",
              "BigTable",
              "Cassandra",
              "Cloudwatch",
              "CosmosDB",
              "CSV",
              "Datadog",
              "DogStatsD",
              "Google Cloud Storage",
              "Graphite",
              "Honeycomb",
              "InfluxDB",
              "JSON",
              "Kafka",
              "MongoDB",
              "MySQL",
              "Netdata",
              "New Relic",
              "Postgres",
              "Prometheus",
              "Redis",
              "S3",
              "Snowflake",
              "SQLite",
              "StatsD",
              "Telegraf",
              "Telegraf StatsD",
              "TimescaleDB"
          ]
  
      },
      {
          sectionName: "Optimizers",
          sectionPath: "/docs/optimizers",
          sectionSubsections: [
              "Optimizers Overview",
              "Optimizer Lifecycle",
              "When should I use optimization?",
              "Optimization best practices",
              "SHG",
              "Dual Annealing",
              "Differential Evolution"
          ]
  
      },
      {
          sectionName: "Plugins",
          sectionPath: "/docs/plugins",
          sectionSubsections: [
              "Plugin development",
              "Engine plugins",
              "Optimizer plugins",
              "Persona plugins",
              "Reporter plugins",
              "Using plugins"
          ]
  
      },
      {
          sectionName: "Examples and Recipes",
          sectionPath: "/docs/examples_and_recipies",
          sectionSubsections: [
              "Simulating login",
              "Context sharing",
              "Cross-graph communication",
              "Optimization cycling",
              "Avoiding timeouts and deadlocks",
              "Graph optimization"
          ]
  
      },
      {
          sectionName: "Debugging",
          sectionPath: "/docs/debugging",
          sectionSubsections: [
              "Working with Hedra logs",
              "Reporting issues"
          ]
  
      },
      {
          sectionName: "Other",
          sectionPath: "/docs/other",
          sectionSubsections: [
              "Thanks"
          ]
  
      },
  ]

  const subsections: {[k: string]: string[]} = articles.reduce((
      subSections, 
      docsLink
  ) => ({...subSections, [docsLink.sectionName]: docsLink.sectionSubsections}), {})

  const searchData: {[itemName: string]: {
      name: string,
      link: string,
      section: string,
      subSection: string
  }} = {}

  articles.forEach(docsItem => {
      searchData[docsItem.sectionName.toLowerCase()] = {
          name: docsItem.sectionName,
          link: `${docsItem.sectionPath}#${docsItem.sectionSubsections[0]}`,
          section: docsItem.sectionName,
          subSection: docsItem.sectionSubsections[0] as string
      };
  })

  articles.forEach(docsItem => {
      docsItem.sectionSubsections.forEach(subsectionName => {

        let subSectionSlug = subsectionName.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
        if (subSectionSlug[subSectionSlug.length -1] === '-'){
            subSectionSlug = subSectionSlug.slice(0, subSectionSlug.length - 1)
        }
          searchData[subsectionName.toLowerCase()] = {
              name: subsectionName,
              link: `${docsItem.sectionPath}#${subSectionSlug}`,
              section: docsItem.sectionName,
              subSection: subsectionName
          };
      });
  });

  return ({
      selectedSection: initialSection,
      selectedSubSection: initialSubSection, 
      selectedSubSections: [],
      subSectionRefs: {},
      articles: articles.map((article) => ({
        ...article,
        slugs: article.sectionSubsections.reduce((slugsMap, subsectionName) => {

        let slug = subsectionName.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')
        
        if (slug[slug.length -1] === '-'){
            slug = slug.slice(0, slug.length - 1)
        }

        return ({
        ...slugsMap,
        [slug]: subsectionName
        })
        }, {})
      })),
      subsections: subsections,
      searchDocs: searchData,
      docsNavRefs: {},
      setSelectedSection: (updatedSection) => set(() => ({ selectedSection: updatedSection, selectedSubSections: get().subsections[updatedSection] })),
      setSelectedSubSection: (updatedSubSection) => set(() => ({ selectedSubSection: updatedSubSection })),
      setSelectedSubSections: (updatedSection) => set(() => ({ selectedSubSections: get().subsections[updatedSection] })),
      setArticles: (updatedArticles) => set(() => ({ articles: updatedArticles })),
      setSubSections: (updatedSubSections) => set((() => ({ subsections: updatedSubSections, selectedSubSections: updatedSubSections[get().selectedSection] }))),
      setSearchDocs: (updatedSearchDoc) => set((() => ({ searchDocs: {...get().searchDocs, [updatedSearchDoc.name.toLowerCase()]: updatedSearchDoc} }))),
      setSubSectionRefs: (updatedRefs) => set(() => ({ subSectionRefs: updatedRefs })),
      setDocsNavRefs: (updatedDocsNavRefs) => set(() => ({ docsNavRefs: updatedDocsNavRefs }))
    })
})


export {
    useDocsStore
}