import ChairmanTable from "../Table/ChairmanTable";
import Form from "../Utilities/Form/ChairmanForm";

export default function AdminTotal(){
    return(
        <>
        <div>
           
        <Form buttonName="Add Officer" />
         <ChairmanTable />

        </div>
         
        </>
    )
}