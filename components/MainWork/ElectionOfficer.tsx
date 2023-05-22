import OfficerTable from "../Table/OfficerTable";
import Form from "../Utilities/Form/OfficerForm";

export default function AdminTotal(){
    return(
        <>
        <div>
           
        <Form buttonName="Add Voter" />
         <OfficerTable />

        </div>
         
        </>
    )
}