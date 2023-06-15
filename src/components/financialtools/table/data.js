import { IconButton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { SVG } from "@assets/svg";
const StyledIconButton = styled(IconButton)(() => ({
  fontFamily: "Poppins",
  width: 30,
  height: 30,
  background: "#D5E3F7",
  fontSize: 12,
  fontWeight: 500,
  color: "#274593",
}));

const SaveButton = ({ buttonName, buttonPdf }) => {
  return (
    <>
      <Stack direction="row" spacing={1.5} justifyContent="center">
        <StyledIconButton>{buttonName}</StyledIconButton>
        <StyledIconButton>{buttonPdf}</StyledIconButton>
      </Stack>
    </>
  );
};

const ManageButtonIcon = ({ eyeIcon, editIcon, mailIcon }) => {
  return (
    <>
      <Stack direction="row" spacing={1.5} justifyContent="center">
        <StyledIconButton
          LinkComponent={Link}
          to="/financial-tools/view-invoices"
        >
          {eyeIcon}
        </StyledIconButton>
        <StyledIconButton LinkComponent={Link} to="/financial-tools/edit">
          {editIcon}
        </StyledIconButton>
        <StyledIconButton LinkComponent={Link} to="#!">
          {mailIcon}
        </StyledIconButton>
      </Stack>
    </>
  );
};

export const USER_COLUMN_DATA = [
  {
    id: 1,
    name: "Date",
    key: "date",
    width: 115,
  },
  {
    id: 2,
    name: "Number / ID",
    key: "number",
    tableCellClass: "text-center",
  },
  {
    id: 3,
    name: "Company",
    key: "company",
  },
  {
    id: 4,
    name: "Amount",
    key: "amount",
  },
  {
    id: 5,
    name: "Sent?",
    key: "sent",
    tableCellClass: "text-center",
  },
  {
    id: 6,
    name: "Save",
    key: "save",
  },
  {
    id: 7,
    name: "Manage",
    key: "manage",
  },
];

export const USER_ROW_DATA = [
  {
    date: "2022-19-29",
    number: "117082",
    company: "PanelPlace",
    amount: "$55.12",
    sent: <SVG.CircleCheckIcon />,
    save: <SaveButton buttonName="XLS" buttonPdf="PDF" />,
    manage: (
      <ManageButtonIcon
        eyeIcon=<SVG.EyeIcon />
        editIcon=<SVG.EditIcon />
        mailIcon=<SVG.ForwardIcon />
      />
    ),
  },

  {
    date: "2022-19-29",
    number: "117082",
    company: "Telegram Community LLC Development",
    amount: "$5",
    sent: <SVG.CircleCheckIcon />,
    save: <SaveButton buttonName="XLS" buttonPdf="PDF" />,
    manage: (
      <ManageButtonIcon
        eyeIcon=<SVG.EyeIcon />
        editIcon=<SVG.EditIcon />
        mailIcon=<SVG.ForwardIcon />
      />
    ),
  },
  {
    date: "2022-19-29",
    number: "117082",
    company: "PanelPlace",
    amount: "$1,500.00",
    sent: <SVG.CircleCheckIcon />,
    save: <SaveButton buttonName="XLS" buttonPdf="PDF" />,
    manage: (
      <ManageButtonIcon
        eyeIcon=<SVG.EyeIcon />
        editIcon=<SVG.EditIcon />
        mailIcon=<SVG.ForwardIcon />
      />
    ),
  },
  {
    date: "2022-19-29",
    number: "117082",
    company: "Pepsico EU Limited",
    amount: "$55.12",
    sent: <SVG.CircleCheckIcon />,
    save: <SaveButton buttonName="XLS" buttonPdf="PDF" />,
    manage: (
      <ManageButtonIcon
        eyeIcon=<SVG.EyeIcon />
        editIcon=<SVG.EditIcon />
        mailIcon=<SVG.ForwardIcon />
      />
    ),
  },
  {
    date: "2022-19-29",
    number: "117082",
    company: "Anigmia Founder Co",
    amount: "$27.11",

    save: <SaveButton buttonName="XLS" buttonPdf="PDF" />,
    manage: (
      <ManageButtonIcon
        eyeIcon=<SVG.EyeIcon />
        editIcon=<SVG.EditIcon />
        mailIcon=<SVG.ForwardIcon />
      />
    ),
  },
  {
    date: "2022-19-29",
    number: "117082",
    company: "PanelPlace",
    amount: "$1,500.00",
    sent: <SVG.CircleCheckIcon />,
    save: <SaveButton buttonName="XLS" buttonPdf="PDF" />,
    manage: (
      <ManageButtonIcon
        eyeIcon=<SVG.EyeIcon />
        editIcon=<SVG.EditIcon />
        mailIcon=<SVG.ForwardIcon />
      />
    ),
  },
  {
    date: "2022-19-29",
    number: "117082",
    company: "Pepsico EU Limited",
    amount: "$55.12",
    sent: <SVG.CircleCheckIcon />,
    save: <SaveButton buttonName="XLS" buttonPdf="PDF" />,
    manage: (
      <ManageButtonIcon
        eyeIcon=<SVG.EyeIcon />
        editIcon=<SVG.EditIcon />
        mailIcon=<SVG.ForwardIcon />
      />
    ),
  },
];

export const VIEW_COLUMN_DATA = [
  {
    id: 1,
    name: "S/N",
    key: "sn",
  },
  {
    id: 2,
    name: "ID",
    key: "id",
  },
  {
    id: 3,
    name: "Description",
    key: "description",
  },
  {
    id: 4,
    name: "Price",
    key: "price",
  },
];

export const VIEW_ROW_DATA = [
  {
    sn: "1",
    id: "117082",
    description:
      "Individual job seeker ZSY web application. Test of longer description that fits in two lines.",
    price: "$100.00",
  },
  {
    sn: "2",
    id: "117082",
    description: "Individual job seeker ZSY web application. ",
    price: "$1600.00",
  },
  {
    sn: "3",
    id: "117082",
    description:
      "Sit tempor leo quis blandit. Ut condimentum nam dictum egestas ornare fringilla tellus non. ",
    price: "$130.00",
  },
  {
    sn: "4",
    id: "117082",
    description: "Interdum nisi aliquam eros, massa ",
    price: "$830.00",
  },
  {
    sn: "5",
    id: "117082",
    description: "Fringilla ullamcorper vestibulum nunc nunc ",
    price: "$55.00",
  },
  {
    sn: "6",
    id: "117082",
    description: "Morbi ipsum ultricies mattis libero blandit ",
    price: "$15.00",
  },
  {
    sn: "7",
    id: "117082",
    description: "Sed fusce ",
    price: "$105.00",
  },
  {
    sn: "8",
    id: "117082",
    description: "Enim ut adipiscing facilisi",
    price: "$90.00",
  },
  {
    sn: "9",
    id: "117082",
    description: "Gravida nulla elementum luctus in gravida",
    price: "$4.00",
  },
  {
    sn: "10",
    id: "117082",
    description:
      "Feugiat aliquet pulvinar aliquam interdum lacus, enim pulvinar",
    price: "$100.00",
  },
];

export const INVOICES_ITEMS_COLUMNS = [
  {
    id: 1,
    name: "Item",
    key: "item",
  },
  {
    id: 2,
    name: "Description",
    key: "description",
  },
  {
    id: 3,
    name: "Quantity",
    key: "quantity",
  },
  {
    id: 4,
    name: "Price",
    key: "price",
  },
  {
    id: 5,
    name: "Discount",
    key: "discount",
  },
  {
    id: 6,
    name: "Tax %",
    key: "tax",
  },
  {
    id: 7,
    name: "Total",
    key: "total",
    tableCellClass: "fontWeight",
  },
];

export const INVOICES_ITEMS_ROW = [
  {
    item: "Advertisement services",
    description:
      "Ut quis consectetur lacus, ut. Et mi nunc in a vel. Ipsum sed magna gravida neque",
    quantity: "5",
    price: "$100.00",
    discount: "$0",
    tax: "0",
    total: "$500.00",
  },
  {
    item: "Service name",
    description: "Description",
    quantity: "1",
    price: "$15,999.00",
    discount: "$999",
    tax: "0",
    total: "$15,000.00",
  },
  {
    item: "Item 3",
    description: "Description of the item",
    quantity: "2",
    price: "$627.99",
    discount: "$999",
    tax: "0",
    total: "$627.99",
  },
];
