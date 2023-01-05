import { DocsArticle } from "./docs";
import { useState, useContext, useEffect, useCallback, useRef, RefObject, useMemo } from "react";
import { NavOpenContext, DocsNav } from "./nav"
import { useWindowDimensions, useScrollDirection } from '../hooks'
import { Footer } from "./footer";
import { DocsSectionGuide } from "./docs";
import { DocsNavMobile } from "./nav";
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useDocsStore } from "../store";
import shallow from 'zustand/shallow'
import { useRouter } from "next/router";


const DocsPageView = ({
    children
}: {
    children: JSX.Element
}) => {

    const [windowWidth, setWindowWidth] = useState(0);

    const { width } = useWindowDimensions();

    useEffect(() => {
        
        setWindowWidth(width)

    }, [windowWidth, width])

    const { isOpen } = useContext(NavOpenContext);

    const [ready, setReady] = useState(false);

    const router = useRouter();

    const { article } = router.query;


    const { 
        articles,
        section,
        subsection,
        subsections,
        refs,
        setSection, 
        setSubSection
    } = useDocsStore(useCallback((state) => ({
        articles: state.articles,
        subsections: state.subsections,
        section: state.selectedSection,
        subsection: state.selectedSubSection,
        refs: state.subSectionRefs,
        setSection: state.setSelectedSection,
        setSubSection: state.setSelectedSubSection,
        setRefs: state.setSubSectionRefs
    }), []), shallow)

    const ref = useRef<HTMLDivElement>(null);
    const trackingRef = useRef<HTMLDivElement>(null);

    const [scrollDir, setScrollDir] = useState("none");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [lastScrollDist, setLastScrollDist] = useState(0);
    const scrollThreshold = 10;

    useEffect(() => {

        if (router.isReady){

            const routerPath = router.asPath.split('#')
            const slugs: {[articleName: string]: {[slug: string]: string}} = articles.reduce((slugs, article) => ({
                ...slugs,
                [article.sectionName]: article.slugs
            }), {})

            const articleSlugs = slugs[article as string] ?? {};

            
            const subsectionPath = routerPath.length > 1 ? articleSlugs[routerPath.at(1) as string] as string : subsection;
    
            setSection(article as string)
            setSubSection(subsectionPath as string)

            setReady(true)
        }
        
    }, [router.isReady])

    const docsSectionNames = articles.map(article => article.sectionName);
    const currentSectionIdx = docsSectionNames.indexOf(section);
    const previousSection = currentSectionIdx - 1 >= 0 ? docsSectionNames[currentSectionIdx - 1] : undefined;
    const nextSection = currentSectionIdx + 1 < docsSectionNames.length ? docsSectionNames[currentSectionIdx + 1] : undefined;

    return (
        ready ? <>
            <DocsNavMobile />
           <div 
                className={`${ready ? '' : 'overflow-y-hidden'} grid grid-cols-[auto] lg:grid-cols-[24rem_auto] 2xl:grid-cols-[24rem_auto_24rem] overflow-x-hidden mt-0 h-full mt-10 ${isOpen ?  'hidden' : ''}`}
                ref={ref}
                onScroll={() => {
                    
                    const scrollY = ref.current?.scrollTop ?? 0;
                    const scrollDistance = Math.abs(scrollY - lastScrollY);
                
                    if (scrollDistance >= scrollThreshold) {

                        const nextScrollDir = scrollY > lastScrollY ? "down" : scrollY < lastScrollY ? "up" : "none";
                        
                        setLastScrollDist(scrollDir === nextScrollDir ? (scrollDistance + lastScrollDist) : scrollDistance);
                        setScrollDir(nextScrollDir);
                        setLastScrollY(scrollY > 0 ? scrollY : 0)
                    }

                    const currentSubsections = subsections[section] ?? [];
                    const sectionHeight = refs[subsection]?.height ?? 0;


                    const currentSubSectionIdx = currentSubsections?.indexOf(subsection) as number;
                    const nextSubSection = currentSubsections[(currentSubSectionIdx + 1) < currentSubsections.length ? (currentSubSectionIdx + 1) : currentSubsections.length - 1] as string;
                    const previousSubSection = currentSubsections[(currentSubSectionIdx - 1) > 0 ? (currentSubSectionIdx - 1) : 0] as string;

                    console.log(sectionHeight, lastScrollY)

                    if (scrollDir === 'down' && lastScrollY > sectionHeight){
                            setSubSection(nextSubSection)

                    } else if (scrollDir === 'up' && lastScrollY < sectionHeight){
                        setSubSection(previousSubSection)
                    }

                }}
            >
                <DocsNav /> 
                <main className="bg-[#eeeeee] min-w-0 lg:pl-6 h-full">
                    <div className={`max-w-7xl mx-auto px-5 sm:px-12 break-words block`}>
                        <DocsArticle>
                        {children}
                        </DocsArticle>
                    </div> 
                    <div className="grid grid-cols-2 max-w-6xl ml-0 2xl:mx-auto">
                        <div className="flex justify-center items-center">
                        {
                            previousSection ? 
                            <button 
                                className="px-8 mx-4 py-2 font-rany text-2xl flex items-center"
                                onClick={() => {
                                    setSection(previousSection);
                                    setSubSection(subsections[previousSection]?.at(0) as string)
                                }}
                            >
                                <RxCaretLeft />
                                <div className="flex flex-col items-center justify-center ml-4">
                                    
                                     <p>Previous</p>
                                     <a href={`#${subsections[previousSection]?.at(0)}`}>
                                        <p className="mt-2">{previousSection}</p>      
                                    </a>  
                                </div>
                            </button> : null
                        }
                        </div>
                        <div className="flex justify-center items-center">
                        {
                            nextSection ? 
                            <button 
                                className="px-8 mx-4 py-2 font-rany text-2xl flex items-center"
                                onClick={() => {
                                    setSection(nextSection);
                                    setSubSection(subsections[nextSection]?.at(0) as string)
                                }}
                            >
                                <div className="flex flex-col items-center justify-center mr-4">
                                    
                                     <p>Next</p>
                                    <p className="mt-2">{nextSection}</p>        
                                </div>
                                <RxCaretRight />
                            </button> : null
                        }
                        </div>
                    </div>
                    <Footer />
                </main>
                <DocsSectionGuide />
            </div>
        </> : <div></div>
    )
}


export {
    DocsPageView
}