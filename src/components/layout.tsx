import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 3fr 6fr 4fr;
    height: 100%;
    width: 100%;
    max-width: 1300px;
    border: 1px solid red;
`;

const Leftbar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 20px;
    gap: 0.7%;
    border: 1px solid white;
    @media (max-width: 1260px) {
        align-items: end;
        gap: 0.1%;
    }// mobile ver left bar css
`;// original left bar css

const Rightbar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: 1px solid white;
`;

const Homelogo = styled.div`
    background-color: transparent;
    height: 60px;
    width: 60px;
    color: white;
    border-radius: 50px;
    font-size: 40px;
    text-align: center;
    padding-top: 7px;
    margin-right: 5px;
    cursor: pointer;
    &:hover {
        background-color: #1d1d1d;
        transition-duration: 0.3s;
    }
`;// original home logo css

const MenuItem = styled.div`
    background-color: transparent;
    height: 50px;
    color: white;
    border-radius: 50px;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    font-size: 21px;
    padding-right: 20px;
    cursor: pointer;
    @media (max-width: 1260px) {
        font-size: 0px;
        padding-right: 0px;
    }// mobile ver css
    &:hover {
        background-color: #1d1d1d;
        transition-duration: 0.2s;
    }
    svg {// bar items svg css
    width: 30px;
    margin-left: 15px;
    margin-right: 15px;
    }
    &.log-out {// original log out btn css
        margin-top: 20px;
        width: 90%;
        font-size: 18px;
        font-weight: 600;
        background-color: #1C9BEF;
        @media (max-width: 1260px) {
            width: 50px;
            font-size: 0px;
            margin-right: 10px;
            margin-top: 10px;
        }// mobile ver css
        svg {
            margin-right: 5px;
        }
        &:hover{
            opacity: 80%;
        }
    }
`;// original menu items css

export default function Layout() {
    const navigate = useNavigate();
    const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out of X?");
    if (ok) {
        await auth.signOut();
        navigate("/login");
    }
    };// 로그아웃 확인 후 로그아웃 시키기, using firebase auth.signout().
    return (
    <Wrapper>
        <Leftbar>
            <Homelogo>𝕏</Homelogo>
            <Link to="/" style={{textDecoration: "none"}}>
                <MenuItem>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                Home
                </MenuItem>
            </Link>
            <Link to="/" style={{textDecoration: "none"}}>
                <MenuItem>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Explore
                </MenuItem>
            </Link>
            <Link to="/" style={{textDecoration: "none"}}>
                <MenuItem>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                Notifications
                </MenuItem>
            </Link>
            <Link to="/" style={{textDecoration: "none"}}>
                <MenuItem>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Messages
                </MenuItem>
            </Link>
            <Link to="/" style={{textDecoration: "none"}}>
                <MenuItem>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                Lists
                </MenuItem>
            </Link>
            <Link to="/" style={{textDecoration: "none"}}>
                <MenuItem>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                Bookmarks
                </MenuItem>
            </Link>
            <Link to="/" style={{textDecoration: "none"}}>
                <MenuItem>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
                Communities
                </MenuItem>
            </Link>
            <Link to="/" style={{textDecoration: "none"}}>
                <MenuItem>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                Premium
                </MenuItem>
            </Link>
            <Link to="/profile" style={{textDecoration: "none"}}>
                <MenuItem>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                Profile
                </MenuItem>
            </Link>
            <Link to="/" style={{textDecoration: "none"}}>
                <MenuItem>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                More
                </MenuItem>
            </Link>
            <MenuItem onClick={onLogOut} className="log-out">
                <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                >
                <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                />
                <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                />
                </svg>
                Log out
            </MenuItem>
        </Leftbar>
        <Outlet />
        <Rightbar>
            <h2>search</h2>
        </Rightbar>
    </Wrapper>
    );
}