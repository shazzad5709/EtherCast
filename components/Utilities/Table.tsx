// import React from 'react'

// interface Props {
//     tableData: FormData[];
//   }
  
//   const Table = ({ tableData }: Props) => {
//   return (
//     <>
       
// <div className="bg-white p-8 rounded-md w-full">
// 	<div className=" flex items-center justify-between pb-6">
		
// 		<div className="flex items-center justify-between">
			
// 				<div className="lg:ml-40 ml-10 space-x-8">
// 					<button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
// 				</div>
// 			</div>
// 		</div>
// 		<div>
// 			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
// 				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
// 					<table className="min-w-full leading-normal">
// 						<thead>
// 							<tr>
// 								<th
// 									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// 									Name
// 								</th>
// 								<th
// 									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// 									Email
// 								</th>
// 								<th
// 									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// 									Organization Name
// 								</th>
// 								<th
// 									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// 									Employee Code
// 								</th>
								
// 							</tr>
// 						</thead>
// 						<tbody>
//                         {tableData.map((data, index) => (
//                         <tr key={index}>
//                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
// 								{data.name}</td>
//                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                 {data.email}</td>
//                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                 {data.orgName}</td>
//                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                 {data.empCode}</td>
//                         </tr>
//                             ))}	
// 						</tbody>
// 					</table>
					
// 				</div>
// 			</div>
// 		</div>
// 	</div>
//     </>
//   )
// }

// export default Table;