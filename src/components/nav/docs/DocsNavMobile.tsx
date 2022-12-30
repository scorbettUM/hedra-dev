import { Transition } from "@headlessui/react";
import { DocsNavSection } from "./DocsNavSection";
import { DocsLinkItem, DocsLinkSubsections } from "../../../data/types";
import { NavOpenContext } from "../main/NavProvider"
import { useContext, Fragment } from "react"
import { useWindowDimensions } from '../../../hooks'
import { Menu } from '@headlessui/react'
import { IoMdBook } from 'react-icons/io'
import { GrClose } from 'react-icons/gr'


const DocsNavMobile = ({
    docsData,
    selectedSection,
    selectedSubSection,
    setSelectedSection,
    setSelectedSubSection
}: {
    docsData: {
        all: DocsLinkItem[],
        subsections: DocsLinkSubsections
    },
    selectedSection: string,
    selectedSubSection: string,
    setSelectedSection(sectionName: string): void,
    setSelectedSubSection(subSectionName: string): void
}) => {

    const { width } = useWindowDimensions();
    const { isOpen, setIsOpen } = useContext(NavOpenContext);

    return (
        
            <Menu as="div" className={`lg:hidden inline-block w-full relative text-left mt-10  ${isOpen && width <= 1024 ? 'h-screen overflow-clip bg-[#eeeeee]' : ''}`}>
                <div className="flex justify-center">
                    <Menu.Button className="inline-flex justify-center rounded px-2 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-7">
                        {
                            !isOpen ?
                            <IoMdBook className="text-[3rem] hover:text-[#038aff]/70" onClick={() => setIsOpen(true)}/> :  
                            <GrClose className="text-[3rem] hover:text-[#038aff]/70" onClick={() => setIsOpen(false)}/>
                        }
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    appear={true}
                    show={isOpen && width <= 1024 }
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div className="w-full py-6 px-2 flex text-center text-[#2e3131]">
                        <div className="flex flex-col font-rany items-center shadow-2xl w-full overflow-y-scroll pt-10">
                            <div className="flex flex-col justify-center text-left w-full h-full">
                                    <div className="py-4 px-8 w-full">

                                        <h3 className="text-2xl">Version: 0.6.21</h3>
                                    </div>
                                    <div className="px-8 h-[70vh] w-full">
                                    {
                                        docsData.all.map((docsLink: DocsLinkItem, idx: number) => 
                                            <div key={`docs-group-mobile-${idx}`}>
                                                <DocsNavSection 
                                                    docsLink={docsLink}
                                                    docsSubsections={docsData.subsections}
                                                    selectedSection={selectedSection}
                                                    selectedSubSection={selectedSubSection}
                                                    setSelectedSection={setSelectedSection}
                                                    setSelectedSubSection={setSelectedSubSection}
                                                />
                                            </div>
                                        )
                                    }
                                    </div>
                                </div>
                        </div>
                    </div>
                </Transition>
            </Menu>
    )
}


export { 
    DocsNavMobile
}