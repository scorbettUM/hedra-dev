import { useState, useRef } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { useEffect } from 'react';


const commandOutputs = [
    `
      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.18


Checking if project exists at - /home/sean/Documents/Workbench/myproject...
No project found! Creating project directories and files.
Initializing project manager.
Found - 0 - new graphs and - 0 - plugins.
Linking project to remote at - https://github.com/scorbettUM/hedra.
Saving project state to .hedra.json config.
Project created!

    `,
    `
      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.16


Creating new graph at - example.py.
Generating - 4 stages:
-setup
-execute
-analyze
-submit

Graph generated!

    `,
    `
      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.16


Validating graph - example - at - example.

Loaded graph.
Validating - 4 - stages.

Validation complete!


    `,
    `
      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.18


Loading graph - Example

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 4 stages - Group Time Elapsed: 5s
✔ Setup for - ExecuteHTTPStage - complete - Group Time Elapsed: 5s
✔ Stage - ExecuteHTTPStage completed 397757 actions at 6520 actions/second over 61 seconds - Group Time Elapsed: 1m.13s
✔ Completed results analysis for 397757 actions and 1 stages over 11 seconds - Group Time Elapsed: 16s
✔ Successfully submitted the results for 397757 actions via Json reporter - Group Time Elapsed: 5s

Graph - Example - completed! Total Time Elapsed: 1m.49s

    `
]


const writeToConsole = ({
    messages,
    commandOutputs,
    idx,
    sliceEnd,
    setTime,
    setTerminalLineData
}: {
    messages: string[],
    commandOutputs: string[],
    idx: number,
    sliceEnd: number,
    setTime(time: number): void,
    setTerminalLineData(lines: TerminalOutput[]): void
}) => {
    const interval = setInterval(() => {

        const currentMessage = messages[idx];
        
        if (currentMessage && sliceEnd <= currentMessage.length){
            const nextMessage = currentMessage.slice(0, sliceEnd)

            setTerminalLineData([
                <TerminalOutput>
                {nextMessage}
            </TerminalOutput>

            ])
            sliceEnd += 1;
        }
        else {
            setTerminalLineData([
                <TerminalOutput>
                {
                    `${currentMessage}
                    ${commandOutputs[idx]}
                    `
                }
            </TerminalOutput>

            ])
            sliceEnd = 0
            clearInterval(interval);
        }
       
        
        setTime(Date.now())
    }, 30);
}

const TerminalController = () => {

    const messages = useRef([
        'hedra project create https://github.com/mytests/myproject',
        'hedra graph create example.py',
        'hedra graph check example',
        'hedra graph run example'
    ])

    const currentMessageIdx = useRef(0);

    const runConsole = useRef(true);
    const [terminalMessage, setMessage] = useState("");
    const sliceEnd = useRef(0);


    const [time, setTime] = useState(Date.now());

    const [terminalLineData, setTerminalLineData] = useState([
        <TerminalOutput>
            {terminalMessage}
        </TerminalOutput>
    ]);


    useEffect(() => {
        
        if (runConsole.current === true){
            
            
            const messagesInterval = setInterval(() => {

                if (currentMessageIdx.current < messages.current.length){

                    
                    writeToConsole({
                        messages: messages.current,
                        commandOutputs,
                        idx: currentMessageIdx.current,
                        sliceEnd: sliceEnd.current,
                        setTime,
                        setTerminalLineData

                    })
                    currentMessageIdx.current += 1
                    sliceEnd.current = 0
                    
                }
                else {                  
                    
                    currentMessageIdx.current = 0
                    sliceEnd.current = 0
                }


            }, 3750)
            
       
            
            return () => {
                clearInterval(messagesInterval);
            };
        } 
        
        runConsole.current = false;

    }, []);


  // Terminal has 100% width by default so it should usually be wrapped in a container div
  return (
    <div className="h-full">
      <Terminal colorMode={ ColorMode.Dark }>
        {terminalLineData}
      </Terminal>
    </div>
  )
};


export {
    TerminalController
}