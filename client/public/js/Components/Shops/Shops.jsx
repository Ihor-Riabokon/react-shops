import React from "react";
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {withRouter, Link} from "react-router-dom";


class Shops extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            pageCount: 1
        }
    }

    componentDidMount() {
        axios.get('http://www.json-generator.com/api/json/get/bZTcBnsIgO').then(response => {
            this.setState({
                data: response.data.slice(0,10),
                original: response.data,
                pageCount: Math.ceil(response.data.length / 10),
                isLoading: false
            });
        })
    }

    handlePageClick (data) {
        let selected = data.selected;
        this.setState({data: this.state.original.slice(selected*10, (selected+1) * 10)});
    };

    render() {
        return (
            (this.state.data.length ?
                <div>
                    <Link to="/logout"> Log Out </Link>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Title</TableHeaderColumn>
                                <TableHeaderColumn>Cover</TableHeaderColumn>
                                <TableHeaderColumn>Link</TableHeaderColumn>
                                <TableHeaderColumn>Description</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.data.map((row, i) =>
                                <TableRow key={i}>
                                    <TableRowColumn>{row.title}</TableRowColumn>
                                    <TableRowColumn><img src={row.cover} /></TableRowColumn>
                                    <TableRowColumn>{row.link}</TableRowColumn>
                                    <TableRowColumn>{row.description}</TableRowColumn>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <ReactPaginate previousLabel={"<"}
                                   nextLabel={">"}
                                   pageCount={this.state.pageCount}
                                   marginPagesDisplayed={3}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handlePageClick.bind(this)}
                                   containerClassName={"pagination"}
                                   subContainerClassName={"pages pagination"}
                                   activeClassName={"active"} />
                </div>
                : (
                 <div> {this.state.isLoading ? 'Loading...' : ''} </div>
            ))
        )
    }
}

export default withRouter(Shops);

