import axios from "axios";
import ChairmanTable from "../Table/ChairmanTable";
import Form from "../Utilities/Form/ChairmanForm";

export default function Chairman(){
    return(
        <>
        <div>
           
        <Form buttonName="Add Officer" />
         <ChairmanTable />

        </div>
         
        </>
    )
}