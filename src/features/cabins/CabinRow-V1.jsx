import styled from "styled-components";
import PropTypes from "prop-types";

import { formatCurrency } from "../../utils/helpers";
import { confirmDelete } from "../../utils/confirmDelete";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./cabins_hooks/useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./cabins_hooks/useCreateCabin";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

/* cabin */

const CabinRow = ({ cabin }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  const handleDuplaicateCabin = () => {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  };

  const confirmDeleteCabin = () => {
    confirmDelete().then((res) => {
      if (res.isConfirmed) {
        deleteCabin(cabinID);
      }
    });
  };

  return (
    <>
      <Table.Row>
        <img src={image} alt="" />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>-</span>
        )}

        <div>
          <button onClick={handleDuplaicateCabin}>
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens="edit-cabin">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <button onClick={() => confirmDeleteCabin()} disabled={isDeleting}>
              <HiTrash />
            </button>
          </Modal>

          <Menus.Menu>
            <Menus.Toggle id={cabinID} />

            <Menus.List id={cabinID}>
              <Menus.Button
                onClick={handleDuplaicateCabin}
                icon={<HiSquare2Stack />}
              >
                Duplicate
              </Menus.Button>
              <Menus.Button onClick={handleDuplaicateCabin} icon={<HiPencil />}>
                Edit
              </Menus.Button>
              <Menus.Button onClick={handleDuplaicateCabin} icon={<HiTrash />}>
                Delete
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>
    </>
  );
};

/* props validation mutate(cabinID) */

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

export default CabinRow;
