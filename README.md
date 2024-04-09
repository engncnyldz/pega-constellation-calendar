
# Pega Custom DX Component for a Calendar Widget

This Pega custom DX component brings Calendar functionality to Cosmos React applications. It is configurable through parameters similar to the OOTB `pxCalendar` section rule.
You can source the Calendar using a data page. If you pass a class name for your data object, you can create a new data record using the Create button, calendar will be automatically refreshed.

This project is kind of an extension of an implementation published by Pega (https://support.pega.com/discussion/how-implement-calendar-widget-constellation-ui-dx-component?). </br>
Also, this implementation is in Javascript, however Pega recommends Typescript, you can check out this official repo for other custom DX components (https://github.com/pegasystems/constellation-ui-gallery/tree/master). </br>
Purpose of this implementation is to enable the usage of data object records for calendar events data source.

## Usage

 - Download the RAP file on Releases section.
 - Import it to your Pega environment.
 - Add `CustomDXComponents:01-01` ruleset to your application's ruleset stack.
 - Create a new landing page on App Studio.
 - Add new Widget.
 - ![image](https://github.com/engncnyldz/pega-constellation-calendar/assets/18334895/0e315b1c-01e8-40c7-b519-a4214510f204) </br>
 - Configure parameters for the calendar.
 - ![image](https://github.com/engncnyldz/pega-constellation-calendar/assets/18334895/f2fa38e7-fa6d-41bd-9e20-59a4c7815725)


## Examples
![image](https://github.com/engncnyldz/pega-constellation-calendar/assets/18334895/eea3581b-dd3d-40f0-b2c3-319256effdbe)

![image](https://github.com/engncnyldz/pega-constellation-calendar/assets/18334895/6af46feb-f708-434c-bc93-392e5fc05c4f)

![image](https://github.com/engncnyldz/pega-constellation-calendar/assets/18334895/8a6d392f-7867-4205-b599-885c6d0aa96a)

