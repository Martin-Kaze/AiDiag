
import { useSelector, useDispatch } from "react-redux";
import { incrament, decrament } from "../state/slices/slice";
import { RootState } from "../state/store"; // Path to your store file

export default function Other() {

const count = useSelector((state: RootState) => state.data.value);
const size =  useSelector((state: RootState) => state.data.size);
const dispatch = useDispatch();
return (
    <div>
        {count} and { size }
        Values

        <div onClick={ () => dispatch(incrament())}> incra </div>
        <div onClick={ () => dispatch(decrament())}> incra </div>
    </div>
)
}