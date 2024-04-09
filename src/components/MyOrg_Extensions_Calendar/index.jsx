import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Configuration,
  useTheme
} from '@pega/cosmos-react-core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import { useState, useEffect } from 'react';
import EventDrawer from './eventDrawer.jsx';

const VIEW_TYPE = {
  DAY: 'timeGridDay',
  WEEK: 'timeGridWeek',
  MONTH: 'dayGridMonth'
};

export default function MyOrgExtensionsCalendar(props) {
  const {
    createActionLabel,
    createClassName,
    dataPage,
    startDateTimeProperty,
    endDateTimeProperty,
    nameProperty,
    idProperty,
    showWeekends,
    getPConnect
  } = props;

  const clockFormat = Number(props.clockFormat);
  const firstDay = Number(props.firstDay);

  const [events, setEvents] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const theme = useTheme();

  const loadEvents = () => {
    const payload = {};
    window.PCore.getDataApiUtils()
      .getData(dataPage, payload, this)
      .then(response => {
        if (response.data.data !== null) {
          const tempEvents = [];
          response.data.data.forEach(event => {
            tempEvents.push({
              id: event[idProperty],
              title: event[nameProperty],
              start: new Date(event[startDateTimeProperty]),
              end:
                event[endDateTimeProperty] === undefined
                  ? null
                  : new Date(event[endDateTimeProperty]),
              event
            });
          });
          setEvents(tempEvents);
        }
      });
  };

  const addNewEvent = () => {
    if (createClassName) {
      getPConnect()
        .getActionsApi()
        .showDataObjectCreateView(createClassName, 'Create')
        .then(() => {
          //
        })
        .catch(() => {
          //
        });
    }
  };

  /* Subscribe to changes to the data object */
  useEffect(() => {
    window.PCore.getPubSubUtils().subscribe(
      window.PCore.getEvents().getDataEvent().DATA_OBJECT_CREATED,
      data => {
        /* If an event object is created - force a reload of the calendar */

        if (data.classId === createClassName) loadEvents();
      },
      'DATAOBJECT_CREATED'
    );
    return () => {
      window.PCore.getPubSubUtils().unsubscribe(
        window.PCore.getEvents().getDataEvent().DATA_OBJECT_CREATED,
        'DATAOBJECT_CREATED'
      );
    };
  }, []);

  useEffect(() => {
    loadEvents();
  }, []);

  const displayEventContent = eventClickInfo => {
    setSelectedEvent({
      title: eventClickInfo.event._def.title,
      start: eventClickInfo.event._def.extendedProps.event[startDateTimeProperty],
      end: eventClickInfo.event._def.extendedProps.event[endDateTimeProperty],
      id: eventClickInfo.event._def.publicId
    });
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <Configuration theme={theme}>
        <EventDrawer
          open={isDrawerOpen}
          setOpen={setIsDrawerOpen}
          event={selectedEvent}
          clockFormat={clockFormat}
        />
        <Card
          style={{
            padding: '10px'
          }}
        >
          <CardHeader
            actions={
              createClassName ? (
                <Button variant='primary' label='Create new event' onClick={addNewEvent}>
                  {createActionLabel}
                </Button>
              ) : undefined
            }
          ></CardHeader>
          <CardContent
            style={{
              marginTop: '10px'
            }}
          >
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin]}
              headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: `${VIEW_TYPE.MONTH},${VIEW_TYPE.WEEK},${VIEW_TYPE.DAY}`
              }}
              height={800}
              initialView='dayGridMonth'
              events={events}
              eventClick={displayEventContent}
              firstDay={firstDay}
              weekends={showWeekends}
              eventBackgroundColor={theme.base.palette['brand-primary']}
              eventBorderColor={theme.components['form-control']['border-color']}
              dayHeaderFormat={{
                weekday: 'long'
              }}
              titleFormat={{
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }}
              eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: clockFormat === 12
              }}
              views={{
                dayGridMonth: {
                  titleFormat: { year: 'numeric', month: 'long' }
                },
                timeGrid: {
                  slotLabelFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    omitZeroMinute: true,
                    hour12: clockFormat === 12
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </Configuration>
    </div>
  );
}
