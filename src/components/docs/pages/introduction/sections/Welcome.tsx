import { Section } from "../../../sections"
import { ExternalLink, TutorialLink, PointList, ArticleLink } from "../../../segments"
import { RiDiscussFill } from 'react-icons/ri'
import { GiBrain } from 'react-icons/gi';
import { GoBeaker } from 'react-icons/go';


const Welcome = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
        <div>
            <p>Welcome to the Hedra documentation!</p>
            <br/>
            <p>
                This documentation covers everything you need to know to get up and running with Hedra, the philosophy guiding the framework, robust API reference, and insight into framework lifecycle and 
                logic. We prefer a "by example" approach that focuses on providing real-world benefit to <em>you</em>, so even sections that cover nitty gritty internals will contain plentiful working examples that
                show how you can put the information provided to use.
            </p>
            <br/>
            <p>
                If you haven't worked with Hedra before or if it's been a minute - we recommend starting with the <ArticleLink article="Working with Graphs" subsection="My first graph" text="My First Graph" />  tutorial. From there
                we recommend the <ArticleLink article="Working with Projects" subsection="Creating a Project" text="Creating a Project" /> tutorial to learn how to work with multiple graphs.
            </p>
            <br/>
            <p>
                These docs are broken into three general sections:
            </p>
            <PointList 
                name="docs-section-items"
                icons={[
                    <RiDiscussFill />,
                    <GoBeaker />,
                    <GiBrain />

                ]}
                points={[
                    "Conceptual discussion",
                    "API reference",
                    "Tutorial/guide"
                ]}
            />
            <p>If you want to look up specfic topics, use the search on the left or simply browse the topics navbar to find what you need. The right hand side section guide is useful for jumping between sections of an topic as well.</p>
            <br/>
            <p>
                We're always open to suggestions and feedback! If you find an issue with any documentation here or want to recommend improvements/changes, open an issue <ExternalLink link="https://github.com/scorbettUM/hedra-dev/issues" text="on the Github repo"/>.
                Hedra's community strives to be open and inclusive. We welcome recommendations big or small from anyone, whether this is your first commit or you're a principal engineer.
            </p>
        </div>
        </Section>


export {
    Welcome
}