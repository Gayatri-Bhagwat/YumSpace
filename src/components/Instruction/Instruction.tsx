import { BsClock } from "react-icons/bs";
import "./Instruction.css"
interface Step {
    step: string;
    title: string;
    text: string;
    timeToPrepare: string;
}

export default function Instruction({step}:{step:Step}){
    return (
        <div className="InstructionSet">
            <span className="StepNo">{step.step}</span>
            <div className="StepTitleAndDescription">
                <span className="StepTitle">{step.title}</span>
                <span className="StepDescription">{step.text}</span>
                <div className="PrepareTime">
                    <BsClock size={"1.2rem"}/>
                    <span>Start Timer ({step.timeToPrepare} min) </span>
                </div>
            </div>
        </div>
    )
}