import PropTypes from 'prop-types';
import React from 'react';
import ProductTable from '../components/ProductTable';
import { filterableTable } from '../styles/filterableTable.scss';
import { filterTableSaga } from '../sagas';
import { drizzleConnect } from 'drizzle-react';

const FilterableTable = ({ filter, onFilter }) => {
    let input;

    return (
        <div className={filterableTable}>
            <input
                value={filter}
                ref={node => {input = node;}}
                onChange={() => onFilter(input.value)} />

            <ProductTable filter={filter} />
        </div>
    );
};

FilterableTable.propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: filterText => dispatch(filterTableSaga(filterText))
    };
};

export default drizzleConnect(
    FilterableTable,
    mapStateToProps,
    mapDispatchToProps
);
