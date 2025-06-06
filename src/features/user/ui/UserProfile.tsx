import { User } from "lucide-react";
import { JSX } from "react";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import useGetCurrentUserProfile from "@features/user/hooks/useGetCurrentUserProfile";

import Button from "@shared/ui/Button/Button";

const UserProfile = (): JSX.Element => {
  const { data } = useGetCurrentUserProfile();
  const { clearToken } = useTokenStore();

  const profileImageUrl = data?.images?.[0]?.url;

  const handleClick = () => {
    if (window.confirm("(임시 기능)로그아웃 하시겠습니까?")) {
      clearToken();
    }
  };

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={handleClick}
      className="h-10 w-10 cursor-pointer rounded-md !px-0 text-sm font-medium"
    >
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt={`${data?.display_name} 프로필 이미지`}
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <User />
      )}
    </Button>
  );
};

export default UserProfile;
