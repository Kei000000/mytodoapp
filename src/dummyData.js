import { v4 as uuidv4 } from "uuid";


const dummyData = [
    {
        id: uuidv4(),
        title: "優先度★★★",
        tasks: [
            {
                id: uuidv4(),
                title: "勉強",
            },
            {
                id: uuidv4(),
                title: "ストレッチ",
            },
            {
                id: uuidv4(),
                title: "散歩",
            },
        ],
    },
    {
        id: uuidv4(),
        title: "優先度★★",
        tasks: [
            {
                id: uuidv4(),
                title: "文書作成",
            },
            {
                id: uuidv4(),
                title: "読書",
            },
        ],
    },
    {
        id: uuidv4(),
        title: "優先度★",
        tasks: [
            // {
            //     id: uuidv4(),
            //     title: "寝る",
            // },
            // {
            //     id: uuidv4(),
            //     title: "POP作成",
            // },
            {
                id: uuidv4(),
                title: "花の水やり",
            },
        ],
    },
];

export default dummyData;