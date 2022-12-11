export const eventTypeColumns = [
  {
    field: "name",
    headerName: "Event Type",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 450,
  },
];

export const venueColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "location",
    headerName: "Location",
    width: 250,
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 180,
  },
  {
    field: "capacity",
    headerName: "Capacity [min-max]",
    width: 160,
    renderCell:(params)=>{
      return(
        <div className="">
          min: {params.row.capacity.min} <br/> max: {params.row.capacity.max}
        </div>
      )
    }
  },
  {
    field: "price",
    headerName: "(min - max) people : Amount",
    width: 250,
    // renderCell:(params)=>{
    //   return(
    //     <>
    //     <div className="">
    //     {params.row.price.reduce((acc, curr)=> acc +=
    //       `${curr.paxRange.from} - ${curr.paxRange.to} : ${curr.amount}\n`
    //       )
    //     }
    //     </div>
    //     </>
    //   )
    // },


    valueGetter: (params) => params.row.price.reduce((acc, curr) => acc += `${curr.paxRange.from} - ${curr.paxRange.to} : ${curr.amount}\n`, '')
  },
];

export const themeColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      console.log(params.row.image)
      return (
        <>
        <div className="cellWithImg">
          <img className="cellImg" src={params?.row?.image?.url || "https://cdn4.iconfinder.com/data/icons/prohibited/100/16-1024.png"} alt="avatar" />
        </div>
      </>
      );
    },
  },
  {
    field: "name",
    headerName: "Theme Name",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 400,
  },
  {
    field: "speciality",
    headerName: "Speciality",
    width: 200,
  },
];

export const cakeColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      console.log(params.row.image)
      return (
        <>
        <div className="cellWithImg">
          <img className="cellImg" src={params?.row?.image?.url || "https://cdn4.iconfinder.com/data/icons/prohibited/100/16-1024.png"} alt="avatar" />
        </div>
      </>
      );
    },
  },
  {
    field: "name",
    headerName: "Cake Name",
    width: 170,
  },
  {
    field: "description",
    headerName: "Description",
    width: 400,
  },
  {
    field: "price",
    headerName: "Price",
    width: 200,
  },
];

export const decorationColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      console.log(params.row.image)
      return (
        <>
        <div className="cellWithImg">
          <img className="cellImg" src={params?.row?.image?.url || "https://cdn4.iconfinder.com/data/icons/prohibited/100/16-1024.png"} alt="avatar" />
        </div>
      </>
      );
    },
  },
  {
    field: "name",
    headerName: "Decoration Name",
    width: 200,
  },
  // {
  //   field: "type",
  //   headerName: "Type",
  //   width: 150,
  // },
  {
    field: "description",
    headerName: "Description",
    width: 350,
  },
  {
    field: "price",
    headerName: "Price",
    width: 115,
  },
];


export const drinksColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      console.log(params.row.image)
      return (
        <>
        <div className="cellWithImg">
          <img className="cellImg" src={params?.row?.image?.url || "https://cdn4.iconfinder.com/data/icons/prohibited/100/16-1024.png"} alt="avatar" />
        </div>
      </>
      );
    },
  },
  {
    field: "name",
    headerName: "Drink Name",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 350,
  },
  {
    field: "price",
    headerName: "Price",
    width: 115,
  },
  {
    field: "category",
    headerName: "Category",
    width: 115,
  },
  {
    field: "imported",
    headerName: "Imported",
    width: 115,
  },
  {
    field: "alcoholic",
    headerName: "Alcoholic",
    width: 115,
  },
  
  {
    field: "available",
    headerName: "Availability",
    width: 115,
  },
];



export const customerColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "name",
    headerName: "Name",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.fname + '  ' + params.row.lname}
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Username",
    width: 135,
  },
  {
    field: "email",
    headerName: "Email address",
    width: 200,
  },
  {
    field: "address",
    headerName: "Address",
    width: 115,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 120,
  },
];