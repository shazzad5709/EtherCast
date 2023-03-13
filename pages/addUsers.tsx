// import { useState } from "react";
// import { useToast } from "@chakra-ui/react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import Input from "../components/Input";
// import Button from "../components/Button";
// import { User } from "../types/User";

// const AddUser = () => {
//   const toast = useToast();
//   const { register, handleSubmit } = useForm<User>();
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (data: User) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post("/api/users", data);
//       toast({
//         title: "User added.",
//         description: "A notification has been sent to the added user.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     } catch (error) {
//       console.error(error);
//       toast({
//         title: "Error",
//         description: "An error occurred while adding the user.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//     setIsLoading(false);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h1 className="text-xl font-medium mb-4">Add User</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Input
//           label="Name"
//           name="name"
//           placeholder="Enter name"
//           ref={register({ required: true })}
//         />
//         <Input
//           label="Email"
//           name="email"
//           placeholder="Enter email"
//           ref={register({ required: true })}
//         />
//         <Button isLoading={isLoading} type="submit">
//           Add User
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default AddUser;
