import {
  alpha,
  Box,
  Button,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { H6 } from "components/Typography";
import BlankCheckBoxIcon from "icons/BlankCheckBoxIcon";
import CheckBoxIcon from "icons/CheckBoxIcon";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import ScrollBar from "simplebar-react";

import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import UkoAvatar from "components/UkoAvatar";
import AddBusinessOwner from "./AddManageUser";
import {
  StyledPagination,
  StyledSearchIcon,
  StyledSearchInput,
} from "components/updateKyc/styledComponents";
import AddManageUser from "./AddManageUser";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const SelectCheckBox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;
  useEffect(() => {
    if (resolvedRef) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [resolvedRef, indeterminate]);
  return (
    <Checkbox
      {...rest}
      disableRipple
      ref={resolvedRef}
      checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />}
      icon={<BlankCheckBoxIcon fontSize="small" color="primary" />}
    />
  );
});

function SearchFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  return (
    <StyledSearchInput
      placeholder="Search..."
      startAdornment={<StyledSearchIcon />}
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}

const ManageUserList = ({ data = [], handleDelete, handleUpdate }) => {
  const theme = useTheme();

  const columnShape = [
    {
      minWidth: 180,
      Header: "First Name",
      accessor: "firstName",
    },
    {
      minWidth: 180,
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      minWidth: 230,
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Edit",
      accessor: "edit",
      Cell: (props) => {
        const { state, row } = props;
        const [open, setOpen] = useState(false);
        const selectedRow = Object.keys(state.selectedRowIds).includes(row.id);
        return (
          <>
            <IconButton
              component="span"
              disableRipple
              onClick={() => {
                setOpen(true);
              }}
            >
              <Edit
                sx={{
                  color: selectedRow ? "primary.main" : "text.disabled",
                }}
              />
            </IconButton>

            <AddManageUser
              edit
              open={open}
              update={handleUpdate}
              data={row.original}
              onClose={() => setOpen(false)}
            />
          </>
        );
      },
    },
    {
      Header: "Delete",
      accessor: "delete",
      Cell: (props) => {
        const { state, row } = props;
        const [open, setOpen] = useState(false);
        const selectedRow = Object.keys(state.selectedRowIds).includes(row.id);
        return (
          <>
            <IconButton
              component="span"
              disableRipple
              onClick={() => {
                handleDelete(row.original.userId);
              }}
            >
              <DeleteForeverIcon
                sx={{
                  color: selectedRow ? "primary.main" : "text.disabled",
                }}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  const columns = useMemo(() => columnShape, []);
  const tableData = useMemo(() => data, [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
    state,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllRowsSelectedProps }) => <SelectCheckBox {...getToggleAllRowsSelectedProps()} />,
    //       Cell: ({ row }) => <SelectCheckBox {...row.getToggleRowSelectedProps()} />,
    //     },
    //     ...columns,
    //   ]);
    // }
  ); // handle pagination

  const handleChange = (_event, currentPageNo) => {
    gotoPage(currentPageNo - 1);
  };

  const ids = selectedFlatRows.map((item) => item.original.id);
  return (
    <Box>
      <FlexBox
        py="2rem"
        px="1.5rem"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <SearchFilter
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {selectedFlatRows.length > 0 && (
          <FlexBox alignItems="center">
            <H6 mr={1}>{selectedFlatRows.length} Selected</H6>
            <Button
              size="small"
              color="error"
              variant="contained"
              sx={{
                color: "common.white",
              }}
              onClick={() => handleDelete(ids)}
            >
              Delete Selected
            </Button>
          </FlexBox>
        )}
      </FlexBox>

      <ScrollBar>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow
                {...headerGroup.getHeaderGroupProps()}
                sx={{
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? alpha("#E5F3FD", 0.5)
                      : alpha("#E5F3FD", 0.05),
                }}
              >
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell
                      {...cell.getCellProps()}
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        borderBottom: "1px solid",
                        borderColor:
                          theme.palette.mode === "light"
                            ? "secondary.light"
                            : "divider",
                      }}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollBar>

      <Stack alignItems="center" marginY="2rem">
        <StyledPagination
          shape="rounded"
          onChange={handleChange}
          count={pageOptions.length}
        />
      </Stack>
    </Box>
  );
};

export default ManageUserList;
