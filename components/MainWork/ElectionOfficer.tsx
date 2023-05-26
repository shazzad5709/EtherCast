import OfficerTable from '../Table/OfficerTable';
import Form from '../Utilities/Form/OfficerForm';

export default function ElectionOfficer() {
    return (
        <>
            <div>
                <Form buttonName='Add Voter' />
                <OfficerTable />
            </div>
        </>
    );
}