import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        {/* <CreateCabinForm /> */}
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};
// const AddCabin = () => {
//   const [openModal, setOpenModal] = useState(false);

//   const onCloseModal = () => setOpenModal((modal) => !modal);

//   return (
//     <div>
//       <Button onClick={onCloseModal}>Add new cabin</Button>

//       {openModal && (
//         <Modal onCloseModal={onCloseModal}>
//           <CreateCabinForm onCloseModal={onCloseModal} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddCabin;
