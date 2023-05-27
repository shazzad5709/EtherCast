//  <div>
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
//           <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h4 className="text-xl font-bold leading-tight tracking-tight md:text-xl">
//                 Update Voter Info
//               </h4>
//               <form
//                 className="space-y-4 md:space-y-6"
//                 onSubmit={handleSubmit}
//               >
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block mb-2 text-sm font-medium"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                     placeholder="Name"
//                     required
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                     placeholder="username@example.com"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="org_name"
//                     className="block mb-2 text-sm font-medium"
//                   >
//                     Organization Name
//                   </label>
//                   <input
//                     type="text"
//                     name="org_name"
//                     id="org_name"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                     placeholder="IIT"
//                     required
//                     value={orgName}
//                     onChange={(e) => setOrgName(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="empCode"
//                     className="block mb-2 text-sm font-medium"
//                   >
//                     Employee Code
//                   </label>
//                   <input
//                     type="text"
//                     name="empCode"
//                     id="empCode"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                     placeholder="123"
//                     required
//                     value={employee_id}
//                     onChange={(e) => setEmpCode(e.target.value)}
//                   />
//                 </div>
//                 <button
//                           type="submit"
//                           className="w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                         >{buttonName}</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div> 