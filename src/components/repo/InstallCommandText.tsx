import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { HiClipboardCopy, HiClipboardCheck } from 'react-icons/hi'
import { asBuffer } from '../../tools';


const InstallCommandText = () => {

    const installCommand = "pip install hedra";
    const [sectionActive, setSectionActive] = useState(false);
    const [sectionText, setSectionText] = useState(installCommand);
    const buffer = asBuffer(installCommand);



    useEffect(() => {  
        
        const interval = setInterval(() => {

            setSectionActive(false);

        }, 3000)

        return () => clearInterval(interval)

    }, []);
    
    
    const { ref, inView } = useInView();

    return(
        <div className="text-center w-screen h-[50vh]">   
            <button 
                className='cursor-pointer w-full w-[95%] xs:w-3/4 lg:w-1/2'
                id='copy-pip-install'
                type='button'
                onClick={() => {

                    setSectionActive(true)
                    if ("clipboard" in navigator) {
                        navigator.clipboard.writeText(installCommand);
                    } else {
                        document.execCommand("copy", true, installCommand);
                    }

                }}
            >
                <code 
                    className={`font-informe font-extralight px-20 tracking-wider h-[65px] bg-[#2e3131] text-[#eeeeee] text-[1.4rem] xs:text-3xl overflow-x-auto rounded flex justify-center border border-[3px] ${sectionActive ? 'border-[#038aff]/90' : 'border-transparent lg:hover:border-[#038aff]/60'} w-full`} 
                    ref={ref}
                >
                    <div className='mr-2 flex items-center'>
                        {
                            sectionActive && inView ? <HiClipboardCheck /> : <HiClipboardCopy />
                        }
                    </div>
                     <p className='flex flex-col justify-center break-keep whitespace-nowrap text-left'>{
                        sectionActive ? "Copied!" + buffer : sectionText
                    }</p>
                </code>
            </button>
        </div>
    )
}


export {
    InstallCommandText
}