import "./list.scss"
import Datatable from "../datatable/Datatable"

const AddList = ({columns}) => {
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable columns={columns}/>
      </div>
    </div>
  )
}
export default AddList