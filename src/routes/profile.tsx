import { styled } from "styled-components";
import { auth,  storage } from "../firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Wrapper = styled.div`
    position: relative;
    background-color: black;
    display: flex;
    flex-direction: column;
    width: 600px;
    max-width: 600px;
    border-left: 0.5px solid gray;
    border-right: 0.5px solid gray;
    @media (max-width: 660px) {
        width: 100%;
    }
`;

const BackgroundImg = styled.div`
    width: 100%;
    height: 200px;
    background-color: #333639;
`;

const Header = styled.div`
    position: sticky;
    top: 0px;
    height: 52px;
    display: flex;
    flex-direction: row;
    z-index: 10;// 충분한 크기의 z index 주기 (최상단 표시).
`;

const HeaderBtn = styled.button`
    cursor: pointer;
    font-size: 20px;
    font-weight: 300;
    width: 100%;
    color: white;
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.85);
`;

const AvatarUpload = styled.label`
    position: absolute;
    top: 180px;
    left: 15px;
    width: 140px;
    height: 140px;
    overflow: hidden;
    border: 4px solid black;
    border-radius: 50%;
    background-color: gray;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 50px;
    }
`;

const AvatarImg = styled.img`
  width: 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const MyProfileBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    height: auto;
    padding: 15px;
    margin-top: 70px;
    border: 1px solid red;
`;

const Name = styled.span`
    font-size: 20px;
`;

const Email = styled.span`
    font-size: 15px;
    color: gray;
`;

export default function Profile(){
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!user) return;
        if (files && files.length === 1) {
            const maxfilesize = 1 * 1024 * 1024;// file 크기 제한 1mb
            if(files && files[0].size > maxfilesize){
                alert("File size is too big. maximun file size is 1mb");
                return;
            }// filesize가 1mb 보다 크면 alert 띄우고 return.
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, {
                photoURL: avatarUrl,
            });
        }
    };
    return (
        <Wrapper>
            <Header>
                <HeaderBtn>{user?.displayName ?? "Anonymous"}</HeaderBtn>
            </Header>
            <BackgroundImg>bgimg</BackgroundImg>
            <AvatarUpload htmlFor="avatar">
                {avatar ? (
                <AvatarImg src={avatar} />
                ) : (
                <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
                )}
            </AvatarUpload>
            <AvatarInput
                onChange={onAvatarChange}
                id="avatar"
                type="file"
                accept="image/*"
            />
            <MyProfileBox>
            <Name>{user?.displayName ?? "Anonymous"}</Name>
            <Email>{user?.email ?? "Email not registered"}</Email>
            <Email>Joined {user?.metadata.creationTime ?? "/No registered time"}</Email>
            </MyProfileBox>
        </Wrapper>
    );
}