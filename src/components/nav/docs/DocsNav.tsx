import { Transition } from "@headlessui/react";
import { DocsNavSection } from "./DocsNavSection";
import { DocsLinkItem, DocsLinkSubsections } from "../../../store/types";
import { DocsNavSearch } from "./DocsNavSearch";
import { UIEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDocsStore, useScrollStore } from "../../../store";
import { shallow } from 'zustand/shallow'
import getConfig from 'next/config';
import { useRouter } from "next/router";

const { publicRuntimeConfig } = getConfig()


const DocsNav = () => {

    const ref = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const router = useRouter()

    useEffect(() => {
        setReady(true)
    }, [])

    const { 
        articles,
    } = useDocsStore(useCallback((state) => ({
        articles: state.articles
    }), []), shallow)

    const {
        setNavRef
    } = useScrollStore(useCallback((state) => ({
        setNavRef: state.setNavScrollRef      
    }), []))


    useEffect(() => {

        if (router.isReady){
            setNavRef(ref)
        }

    }, [router.isReady])


    return (
        <div className="lg:flex hidden lg:sticky top-0 left-0 right-0 py-0 z-50 h-[90vh] pt-10">
            <Transition
                appear={true}
                show={ready}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="font-rany shadow-2x flex flex-col justify-center text-left w-full h-3/4">
                    <div className="py-4 px-8 w-full">
                        <h3 className="text-lg">Version: {publicRuntimeConfig.hedraVersion}</h3>
                    </div>
                    <DocsNavSearch 
                        setSearchVisible={setSearchVisible}
                    />
                    <div 
                        className={`overflow-y-scroll px-8 h-[70vh] w-full ${searchVisible ? 'invisible' : ''}`}
                        ref={ref}
                    >
                    {
                        articles.map((docsLink: DocsLinkItem, idx: number) => 
                            <div key={`docs-group-${idx}`}>
                                <DocsNavSection 
                                    docsLink={docsLink}
                                />
                            </div>
                        )
                    }
                    </div>
                </div>
            </Transition>
        </div>
    )
}


export { 
    DocsNav
}