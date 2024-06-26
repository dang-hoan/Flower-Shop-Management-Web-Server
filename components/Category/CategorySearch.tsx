import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
    Card,
    InputAdornment,
    OutlinedInput,
    SvgIcon,
    Box,
    Button,
} from "@mui/material";
// import { CategoriesFilter } from "./categories-filter";

export const CategorySearch = ({
    onSearchChange,
}: // onFilterChange,
any) => {
    const [openFilterPopup, setOpenFilterPopup] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [selectedFilter, setSelectedFilter] = React.useState({});

    const handleSearchButtonClick = () => {
        onSearchChange(inputValue);
    };

    const handleOpenFilterPopup = () => {
        setOpenFilterPopup(true);
    };

    const handleCloseFilterPopup = () => {
        setOpenFilterPopup(false);
    };

    const handleSelectFilter = (filter: any) => {
        setSelectedFilter(filter);
        // onFilterChange(filter);
        handleCloseFilterPopup();
    };

    return (
        <div>
            <Card sx={{ p: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        // alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                    }}
                >
                    <OutlinedInput
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        // fullWidth
                        placeholder="Search by category name and description"
                        startAdornment={
                            <InputAdornment position="start">
                                <SvgIcon color="action" fontSize="small">
                                    <SearchIcon />
                                </SvgIcon>
                            </InputAdornment>
                        }
                        sx={{ flexGrow: 1 }}
                    />
                    {/* <SvgIcon
                        color="action"
                        fontSize="small"
                        sx={{ marginLeft: 2, cursor: "pointer" }}
                        onClick={handleOpenFilterPopup}
                    >
                        <AdjustmentVerticalIcon />
                    </SvgIcon> */}
                    <Button
                        variant="outlined"
                        onClick={handleSearchButtonClick}
                    >
                        Tìm kiếm
                    </Button>
                </Box>
            </Card>

            {/* <CategoriesFilter
                open={openFilterPopup}
                onClose={handleCloseFilterPopup}
                onSelectFilter={handleSelectFilter}
            /> */}
        </div>
    );
};
