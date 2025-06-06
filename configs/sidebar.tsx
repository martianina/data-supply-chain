import { TbBook2, TbClipboardCheck, TbSettings, TbShoppingBag, TbShoppingBagPlus, TbSmartHome, TbTruck } from "react-icons/tb";
import { BsBox2Heart } from "react-icons/bs";
import { TbScale, TbCreditCard, TbClipboardHeart } from "react-icons/tb";
import { BiBuildings } from "react-icons/bi";
import { MdOilBarrel } from "react-icons/md";
import { FaBacteria } from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";



export const sidebar = [
    {
        label: "main",
        contents: [
            {
                label: "Dashboard",
                icon: <TbSmartHome />,
                path: "/",
            },
        ]
    },
    {
        label: "inventory",
        contents: [
            {
                label: "Audit",
                icon: <TbScale />,
                path: "/inventory/audit",
            },
            {
                label: "Items",
                icon: <BsBox2Heart />,
                path: "/inventory/items",
            },

        ]
    },
    {
        label: "Purchasing",
        contents: [
            {
                label: "Requests",
                icon: <TbShoppingBagPlus />,
                path: "/purchasing/requests/"
            },
            {
                label: "Purchasing",
                icon: <TbCreditCard />,
                path: "/purchasing/purchase-orders",
            },
            {
                label: "Receiving",
                icon: <TbTruck />,
                path: "/receiving/",
            },
            {
                label: "Suppliers",
                icon: <BiBuildings />,
                path: "/purchasing/suppliers",
            },

        ]
    },
    {
        label: 'production',
        contents: [
            {
                label: "MBPR",
                icon: <TbBook2 />,
                path: "/production/mbpr",
            },
            {
                label: "Planning",
                icon: <TbClipboardHeart />,
                path: "/production/planning"
            },
            {
                label: "Compounding",
                icon: <MdOilBarrel />,
                path: "/production/compounding"
            },
            {
                label: "Quality",
                icon: <TbClipboardCheck />,
                path: "/production/quality"
            }

        ]
    },
    {
        label: "Quality",
        contents: [
            {
                label: "Micro",
                icon: <FaBacteria />,
                path: "/quality/micro/new"
            },
            {
                label: "QC",
                icon: <HiCheckBadge />,
                path: "/quality/qc/"
            }

        ]
    },
    {
        label: "Accounting",
        contents: [
            {
                label: "Pricing",
                icon: <TbShoppingBag />,
                path: "/accounting/pricing"
            }
        ]
    },
    {
        label: "Misc",
        contents: [
            {
                label: "Settings",
                icon: <TbSettings />,
                path: "/settings"
            }
        ]
    }

];
