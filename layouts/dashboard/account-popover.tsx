import NextLink from "next/link";
import PropTypes from "prop-types";
import {
    Divider,
    MenuItem,
    MenuList,
    Popover,
    Stack,
    Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useCallback } from "react";
import { removeItems } from "@/utils/auth";
// import { useAuth } from "src/hooks/use-auth";

export const AccountPopover = (props: any) => {
    const { user, anchorEl, onClose, open } = props;
    // const auth = useAuth();

    const handleSignOut = useCallback(async () => {
        onClose?.();
        await signOut({
            redirect: true,
            callbackUrl: "/login",
        });
        await removeItems();
    }, [onClose]);

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: "left",
                vertical: "bottom",
            }}
            onClose={onClose}
            open={open}
            slotProps={{ paper: { sx: { width: 200 } } }}
        >
            <Stack
                direction={"column"}
                sx={{
                    py: 1.5,
                    px: 2,
                }}
            >
                <Typography variant="overline">Tài khoản</Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {user?.name}
                </Typography>
            </Stack>
            <Divider />
            <MenuList
                disablePadding
                dense
                sx={{
                    p: "8px",
                    "& > *": {
                        borderRadius: 1,
                    },
                }}
            >
                <MenuItem
                    component={NextLink}
                    href="/profile"
                    onClick={() => onClose?.()}
                >
                    Thông tin cá nhân
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
            </MenuList>
        </Popover>
    );
};

AccountPopover.propTypes = {
    user: PropTypes.any,
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
};
