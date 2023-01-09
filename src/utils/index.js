/**
 * Copyright (C) 2020 European Spallation Source ERIC.
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
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import packageInfo from '../../package.json';

const shortTimeFormat = 'HH:mm';
const shortDateFormat = 'YYYY-MM-DD';
const fullDateTime = 'YYYY-MM-DD HH:mm:ss';

export function formatShortTime(date){
    return moment(date).format(shortTimeFormat);
}

export function formatShortDate(date){
    return moment(date).format(shortDateFormat);
}

export function formatFullDateTime(date){
    return moment(date).format(fullDateTime);
}

/**
 * Sorts a search result such that log entries with same createdDate are
 * collected into separate arrays. The returned object is an array of such
 * arrays, index on date on the format shortDateFormat.
 * @param {*} searchResult 
 */
export function sortSearchResultByDay(searchResult){
    if(!searchResult){
        return [];
    }
    // First sort by createdDate
    let searchResultItems = searchResult.sort((a, b) => b.createdDate - a.createdDate).map((row, index) => {
        return row;
    })

    let result = [];
    searchResultItems.forEach((item, index) => {
        let shortDate = formatShortDate(item.createdDate);
        if(result[shortDate]){
            result[shortDate].push(item);
        }
        else{
            let items = [];
            items.push(item);
            result[shortDate] = items;
        }
    });
    return result;
}

/**
 * Removes image markup from a (body/decription) text, if present. Typical
 * use cas is when user removes an attachement that was added as an
 * embedded image in the body/description.
 * @param {*} markup 
 * @param {*} imageId 
 * @returns 
 */
export function removeImageMarkup(markup, imageId){
    let index = markup.indexOf(imageId);
    if(index === -1){
        return markup;
    }

    let stringBefore = markup.substring(0, index);
    let stringAfter = markup.substring(index + imageId.length, markup.length);

    let exclamationMarkIndex = stringBefore.lastIndexOf('!');
    let closingCurlyBraceIndex = stringAfter.indexOf('}');

    return markup.substring(0, exclamationMarkIndex) +
        markup.substring((stringBefore + imageId).length + closingCurlyBraceIndex + 1, markup.length);
}

/**
 * Checks if a log entry contains the special purpose property "Log Entry Group" and returns
 * its id attribute value if it does. Otherwise returns null.
 * @param {*} logEntry 
 */
export function getLogEntryGroupId(properties){
    if(!properties || properties.length === 0){
        return null;
    }
    for(let i = 0; i < properties.length; i++){
        if(properties[i].name === 'Log Entry Group'){
            if(!properties[i].attributes || properties[i].attributes.length === 0){
                return null;
            }
            for(let j = 0; j < properties[i].attributes.length; j++){
                if(properties[i].attributes[j].name === 'id'){
                    return properties[i].attributes[j].value;
                }
            }
        }
    };
    return null;
}

/**
 * Creates a new Log Entry Group property with an UUID id attribute value.
 */
export function newLogEntryGroup(){
    return {
        name : "Log Entry Group",
        attributes: [
            {
                name: "id",
                value: uuidv4()
            }
        ]
    }
}

/**
 * Sorts log entries based on created date.
 * input array to be sorted when this method returns.
 * @param {*} logs, list of log entries
 * @param {*} descending, true if sort order should be descending, otherwise false
 */
export function sortLogsDateCreated(logs, descending){
    if(descending){
        return logs.sort((a, b) => b.createdDate - a.createdDate);
    }
    else{
        return logs.sort((a, b) => a.createdDate - b.createdDate);
    }
}

export function findLogEntryGroup(tree, logEntryGroupId){
    for(var i = 0; i < tree.length; i++){
        var treeItem = tree[i];
        let existingLogGroupId = treeItem.getLogGroupId();
        if(existingLogGroupId && existingLogGroupId === logEntryGroupId){
            return tree[i];
        }
    }
    return null;
}

/**
 * Converts a JavaScript Date object to a string on format yyyy-MM-dd HH:mm:ss.
 */
export function dateToString(value){
    return value.getFullYear() + '-' + ('0' + (value.getMonth() + 1)).slice(-2) + '-' +
           ("0" + value.getDate()).slice(-2) + ' ' + ('0' + value.getHours()).slice(-2) +
           ':' + ('0' + value.getMinutes()).slice(-2) + ':' +
           ('0' + value.getSeconds()).slice(-2);
}

export function ologClientInfoHeader() {
    return {"X-Olog-Client-Info": "Olog Web " + packageInfo.version + " on " + window.navigator.userAgent}
}
