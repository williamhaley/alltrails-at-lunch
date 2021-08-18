import { createRef, forwardRef, Ref, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { Modal } from 'bootstrap';
import { SortType } from '../types';
import { toggleSort } from '../store/slices/places';

interface ModalProps {
  sort: SortType;
  onToggle: () => void;
}

const ModalForm = forwardRef((props: ModalProps, ref: Ref<HTMLDivElement>) => {
  return (
    <div className="modal fade" tabIndex={-1} ref={ref}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <form>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    name="sort"
                    type="radio"
                    onChange={props.onToggle}
                    checked={props.sort === SortType.RatingsDescending}
                  ></input>
                  Ratings High to Low
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    name="sort"
                    type="radio"
                    onChange={props.onToggle}
                    checked={props.sort === SortType.RatingsAscending}
                  ></input>
                  Ratings Low to High
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-link"
              data-bs-dismiss="modal"
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
            console.log('sure');
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
        onToggle={() => {
          dispatch(toggleSort());
        }}
      />
    </div>
  );
};

export default Sort;
