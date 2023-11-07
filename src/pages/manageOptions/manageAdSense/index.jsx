import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../manageOptions/manageAdSense/layout";

import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading } from "@redux/slice/jobsAndTenders";
import { transformAdSenseResponse } from "@api/transform/choices";
import DialogBox from "@components/dialogBox";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import DeleteCard from "@components/card/deleteCard";
import EditCard from "@components/card/editCard";
import { useDebounce } from "usehooks-ts";
import { addAdSenseAPI, getAdSenseAPI, updateAdSenseAPI } from "@api/adsense";
// deleteAdSenseAPI
import { AddCard } from "@components/card";
function ManageAdSenseComponent() {
    const dispatch = useDispatch();
    const [adSenseTable, setAdSenseTable] = useState([]);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [editAdSense, setEditAdSense] = useState("");
    const [editAdSenseValue, setEditAdSenseValue] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [deleteAdSense, setDeleteAdSense] = useState("");
    const [pageNameValue, setPageNameValue] = useState("");
    const [codeValue, setCodeValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchAdSenseValue = useDebounce(searchTerm, 500);
    const [showAddForm, setShowAddForm] = useState(false);
    const columns = [
        {
            id: "1",
            field: "pageName",
            headerName: "Page Name",
            sortable: true,
        },

        {
            id: "3",
            field: "code",
            headerName: "Code",
            width: 650,
            sortable: true,
        },

        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (item) => {
                return (
                    <Stack direction="row" spacing={1} alignItems="center">
                        {/* <IconButton
                            onClick={() => setDeleteAdSense(item.row.id)}
                            sx={{
                                "&.MuiIconButton-root": {
                                    background: "#D5E3F7",
                                },
                                width: 30,
                                height: 30,
                                color: "#274593",
                            }}
                        >
                            <SVG.DeleteIcon />
                        </IconButton> */}

                        <IconButton
                            onClick={() => handleEdit(item.row)}
                            sx={{
                                "&.MuiIconButton-root": {
                                    background: "#D5E3F7",
                                },
                                width: 30,
                                height: 30,
                                color: "#274593",
                            }}
                        >
                            <SVG.EditIcon />
                        </IconButton>
                    </Stack>
                );
            },
        },
    ];
    const pageList = [
        {
            value: "browseJobs",
            label: "Browse Jobs",
        },
        {
            value: "browseTenders",
            label: "Browse Tenders",
        },
        {
            value: "browseTalents",
            label: "Browse Talents",
        },
        {
            value: "browseVendors",
            label: "Browse Vendors",
        },
    ];

    const adSenseList = async () => {
        dispatch(setLoading(true));
        const page = pages;
        const search = debouncedSearchAdSenseValue || "";
        const response = await getAdSenseAPI({ limit, page, search });
        if (response.remote === "success") {
            const formatData = transformAdSenseResponse(response.data || []);
            if (!formatData.length) {
                dispatch(setLoading(false));
            }
            const formattedData = formatData.map(item => {
                // Split the pageName by capital letters and join with a space
                const formattedPageName = item.pageName.replace(/([a-z])([A-Z])/g, "$1 $2");
                // Uppercase the first letter of the formatted pageName
                const uppercasedPageName = formattedPageName.charAt(0).toUpperCase() + formattedPageName.slice(1);

                return {
                    ...item,
                    pageName: uppercasedPageName
                };
            });
            setAdSenseTable(formattedData);
            const totalCounts = Math.ceil(response.data.count / limit);
            setTotalCount(totalCounts);
        } else {
            console.log(response.error);
        }
    };
    const handleAddAdSenseForm = () => {
        setShowAddForm(true);
    };
    const addAdSenseFunction = async () => {
        const payload = {
            page_title: pageNameValue,
            code: codeValue,
        };
        const response = await addAdSenseAPI(payload);
        if (response.remote === "success") {
            const temp = [...adSenseTable];
            temp.push({
                id: response.data.data.id || Math.random(),
                pageName: response.data.data.page_title,
                code: response.data.data.code,
            });
            setShowAddForm(false);
            setAdSenseTable([...temp]);
            dispatch(setSuccessToast("Add AdSense SuccessFully"));
        } else {
            console.log(response.error);
            dispatch(setErrorToast("Something went wrong"));
        }
    };

    // function getPage(_, page) {
    //   setPages(page);
    // }
    const getPage = useCallback((_, page) => {
        setPages(page);
    }, []);

    // const handleDelete = async () => {
    //     setLoading(false);
    //     const response = await deleteAdSenseAPI({ deleteAdSense });
    //     if (response.remote === "success") {
    //         const newAdSenseTable = adSenseTable.filter((emp) => emp.id !== deleteAdSense);
    //         setAdSenseTable(newAdSenseTable);
    //         setDeleteAdSense("");
    //         dispatch(setSuccessToast("Delete AdSense SuccessFully"));
    //     } else {
    //         dispatch(setErrorToast("Something went wrong"));
    //         console.log(response.error);
    //     }
    // };

    const handleEdit = async (item) => {
        setEditAdSense(item.id);
        setEditAdSenseValue(item.code);
    };

    const handleUpdate = async () => {
        const response = await updateAdSenseAPI({ editAdSense, editAdSenseValue });
        if (response.remote === "success") {
            adSenseList();
            setEditAdSense("");
            dispatch(setSuccessToast(response.data.message));
        } else {
            dispatch(setErrorToast(response.error.errors.title));
        }
    };

    useEffect(() => {
        adSenseList();
    }, [debouncedSearchAdSenseValue, pages, limit]);

    useEffect(() => {
        if (adSenseTable.length) {
            dispatch(setLoading(false));
        }
    }, [adSenseTable]);
    return (
        <>
            <Layout
                addBtnTitle="Add AdSense"
                rows={adSenseTable}
                onAddItems={handleAddAdSenseForm}
                columns={columns}
                totalCount={totalCount}
                page={pages}
                handlePageChange={getPage}
                handleCancel={() => setShowAddForm(false)}
                searchProps={{
                    placeholder: "Search",
                    onChange: (e) => setSearchTerm(e.target.value),
                    value: searchTerm,
                }}
                limitProps={{
                    value: limit,
                    options: [
                        { label: 5, value: 5 },
                        { label: 10, value: 10 },
                        { label: 15, value: 15 },
                    ],
                    onChange: (e) => setLimit(e.target.value),
                }}
                optionsProps={{
                    title: (
                        <div onClick={addAdSenseFunction}>
                            <span className="d-inline-flex align-items-center me-2"></span>{" "}
                            Add AdSense
                        </div>
                    ),
                }}
            />
            <DialogBox open={!!deleteAdSense} handleClose={() => setDeleteAdSense("")}>
                <DeleteCard
                    title="Delete AdSense"
                    content="Are you sure you want to delete AdSense?"
                    handleCancel={() => setDeleteAdSense("")}
                // handleDelete={handleDelete}
                />
            </DialogBox>

            <DialogBox open={!!editAdSense} handleClose={() => setEditAdSense("")}>
                <EditCard
                    title="Edit AdSense Code"
                    handleCancel={() => setEditAdSense("")}
                    setEditValue={setEditAdSenseValue}
                    editValue={editAdSenseValue}
                    handleUpdate={handleUpdate}
                />
            </DialogBox>
            <DialogBox open={!!showAddForm} handleClose={() => setShowAddForm(false)}>
                <AddCard
                    pageList={pageList}
                    title="Add AdSense"
                    content="Select the page name and paste the google AdSense code"
                    handleCancel={() => setShowAddForm(false)}
                    handleStore={addAdSenseFunction}
                    setPageNameValue={(value) => setPageNameValue(value)}
                    setCodeValue={(value) => setCodeValue(value)}
                    pageNameValue={pageNameValue}
                    codeValue={codeValue}
                />
            </DialogBox>
        </>
    );
}

export default ManageAdSenseComponent;
