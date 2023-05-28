import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const Header: React.FC<HeaderProps> = ({showBackArrow, label }) => {
  const router = useRouter();
  const {data: session} = useSession();

  const handleBack = useCallback(() => {
      router.push(`/${session?.user?.role?.toLowerCase()}`);
  }, []);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack 
            onClick={handleBack} 
            
            size={20} 
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "/>
        )}
        <h1 className=" text-xl font-semibold">
          {label}
        </h1>
      </div>
    </div>
  );
}

export default Header;