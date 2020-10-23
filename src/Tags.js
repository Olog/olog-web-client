/**
 * Copyright (C) 2019 European Spallation Source ERIC.
 * <p>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * <p>
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * <p>
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */
import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import './css/olog.css';

class Tags extends Component{

    render(){
        var items = this.props.tags && this.props.tags.sort((a, b) => a.name.localeCompare(b.name)).map((row, index) => {
            return (
                <li  key={index}>
                    <Button style={{padding: "0px", fontSize: "12px"}} variant="link">{row.name}</Button>
                </li>
            )
         })
         
        return (
             <ul className="olog-ul">{items}</ul>
        )
    }
}

export default Tags