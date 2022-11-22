import { Contact } from "@apiType/shop"
// 12 Contacts
let contacts: Contact[] = [
    {
        contactId: 1,
        contactPerson: "Juanita Shepherd",
        phoneNo: "+66 (974) 514-3193",
        address: "462 Cropsey Avenue, Beaverdale, Vermont, 7136",
        lineId: "Irwin",
    },
    {
        contactId: 2,
        contactPerson: "Grace Moon",
        phoneNo: "+66 (875) 545-2618",
        address: "470 Pioneer Street, Savage, Maryland, 8804",
        lineId: "Mullins",
    },
    {
        contactId: 3,
        contactPerson: "Griffin Gutierrez",
        phoneNo: "+66 (800) 457-3461",
        address: "771 Amity Street, Hickory, South Dakota, 7008",
        lineId: "Debbie",
    },
    {
        contactId: 4,
        contactPerson: "Parks Morton",
        phoneNo: "+66 (925) 451-3455",
        address: "201 Sutton Street, Westmoreland, Illinois, 7354",
        lineId: "Melba",
    },
    {
        contactId: 5,
        contactPerson: "Gabrielle Hatfield",
        phoneNo: "+66 (873) 453-2832",
        address: "525 Oak Street, Katonah, Utah, 3210",
        lineId: "Tillman",
    },
    {
        contactId: 6,
        contactPerson: "Franks Schmidt",
        phoneNo: "+66 (869) 547-2005",
        address: "230 Barwell Terrace, Gambrills, Georgia, 5035",
        lineId: "Katy",
    },
    {
        contactId: 7,
        contactPerson: "Daniel Dunlap",
        phoneNo: "+66 (895) 530-3091",
        address: "237 Paerdegat Avenue, Sussex, Tennessee, 1451",
        lineId: "Joseph",
    },
    {
        contactId: 8,
        contactPerson: "Genevieve Hogan",
        phoneNo: "+66 (956) 401-3480",
        address: "917 Nova Court, Abrams, Hawaii, 6713",
        lineId: "Mia",
    },
    {
        contactId: 9,
        contactPerson: "Richard Williams",
        phoneNo: "+66 (923) 499-2893",
        address: "605 Locust Street, Lowell, Minnesota, 7946",
        lineId: "Levine",
    },
    {
        contactId: 10,
        contactPerson: "Dale Dodson",
        phoneNo: "+66 (829) 509-3045",
        address: "270 Fenimore Street, Winesburg, Virginia, 2079",
        lineId: "Juliet",
    },
    {
        contactId: 11,
        contactPerson: "Luann Carney",
        phoneNo: "+66 (828) 400-2150",
        address: "428 Rapelye Street, Orason, Montana, 8484",
        lineId: "English",
    },
    {
        contactId: 12,
        contactPerson: "Lula Sheppard",
        phoneNo: "+66 (977) 589-3529",
        address: "124 Johnson Street, Darrtown, Federated States Of Micronesia, 3168",
        lineId: "Suzette",
    },
]

export const getContacts = () => contacts
export const setContacts = (newData: Contact[]) => {contacts = newData}
