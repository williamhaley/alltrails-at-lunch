import { createRef, forwardRef, Ref, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { Modal } from 'bootstrap';
import { SortType } from '../types';
import { toggleSort } from '../store/slices/places';

interface ModalProps {
  sort: SortType;
  onApply: (sortType: SortType) => void;
}

const sortOptions = [
  { text: 'Ratings High to Low', sort: SortType.RatingsDescending },
  { text: 'Ratings Low to High', sort: SortType.RatingsAscending },
];

const ModalForm = forwardRef((props: ModalProps, ref: Ref<HTMLDivElement>) => {
  const [selection, setSelection] = useState(props.sort);

  return (
    <div className="modal fade" tabIndex={-1} ref={ref}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <form>
              {sortOptions.map((sortOption, index) => {
                return (
                  <div key={index} className="form-check">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        name="sort"
                        type="radio"
                        onChange={() => {
                          setSelection(sortOption.sort);
                        }}
                        checked={selection === sortOption.sort}
                      ></input>
                      {sortOption.text}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-link"
              data-bs-dismiss="modal"
              onClick={() => {
                props.onApply(selection);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

const Sort = () => {
  const dispatch = useAppDispatch();

  const modalRef = createRef<HTMLDivElement>();
  const modal = useRef<Modal | null>(null);
  const { sortType } = useAppSelector((state: RootState) => {
    return {
      sortType: state.places.sort,
    };
  });

  const { isLoadingResults, coordinates } = useAppSelector(
    (state: RootState) => {
      return {
        isLoadingResults: state.places.isLoading,
        coordinates: state.location.coordinates,
      };
    },
  );

  return (
    <div>
      <button
        className="btn btn-outline-primary me-2"
        type="button"
        disabled={isLoadingResults || coordinates === null}
        onClick={() => {
          if (modalRef.current !== null && modal.current === null) {
            modal.current = new Modal(modalRef.current);
          }

          if (modal.current !== null) {
            modal.current.toggle();
          }
        }}
      >
        Sort
      </button>

      <ModalForm
        ref={modalRef}
        sort={sortType}
        onApply={(newSortType: SortType) => {
          if (newSortType === sortType) {
            return;
          }

          dispatch(toggleSort());
        }}
      />
    </div>
  );
};

export default Sort;
