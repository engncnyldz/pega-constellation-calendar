import { withKnobs } from '@storybook/addon-knobs';

import MyOrgExtensionsCalendar from './index.jsx';

import configProps from './mock.stories';

export default {
  title: 'MyOrgExtensionsCalendar',
  decorators: [withKnobs],
  component: MyOrgExtensionsCalendar
};

const setPCore = () => {
  window.PCore = {
    getEnvironmentInfo: () => {
      return {
        getTimeZone: () => 'local',
        getUseLocale: () => 'tr-TR'
      };
    },
    getEvents: () => {
      return {
        getCaseEvent: () => {
          return {
            ASSIGNMENT_SUBMISSION: 'ASSIGNMENT_SUBMISSION'
          };
        },
        getDataEvent: () => {
          return {
            DATA_OBJECT_CREATED: 'DATA_OBJECT_CREATED'
          };
        }
      };
    },
    getPubSubUtils: () => {
      return {
        subscribe: () => {
          /* nothing */
        },
        unsubscribe: () => {
          /* nothing */
        }
      };
    },
    getSemanticUrlUtils: () => {
      return {
        getResolvedSemanticURL: () => {
          return 'https://www.google.com';
        },
        getActions: () => {
          return {
            ACTION_OPENWORKBYHANDLE: 'openWorkByHandle',
            ACTION_SHOWDATA: 'showData'
          };
        }
      };
    },

    getDataApiUtils: () => {
      return {
        getData: () => {
          return Promise.resolve({
            data: {
              data: [
                {
                  pyGUID: '0f79c604-c588-454a-91e0-8f5236413bfa',
                  Name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  Details: 'New',
                  StartDateTime: '2024-04-08T07:12:00.000Z',
                  EndDateTime: '2024-04-08T09:00:00.000Z'
                },

                {
                  pyGUID: '250397a3-ac2e-4a1c-a7e7-a8d5da5b77cf',
                  Name: 'test',
                  Details: 'New',
                  StartDateTime: '2024-04-10T07:00:00.000Z'
                  // EndDateTime: '2024-04-12T09:00:00.000Z'
                },
                {
                  pyGUID: '250397a3-ac2e-4a1c-a7e7-a8d5da5b77cf',
                  Name: 'test',
                  Details: 'New',
                  StartDateTime: '2024-04-15T07:00:00.000Z',
                  EndDateTime: '2024-04-17T09:00:00.000Z'
                }
              ]
            }
          });
        }
      };
    }
  };
};

export const baseMyOrgExtensionsCalendar = () => {
  setPCore();
  const props = {
    createActionLabel: configProps.createActionLabel,
    createClassName: configProps.createClassName,
    dataPage: configProps.dataPage,
    startDateTimeProperty: configProps.startDateTimeProperty,
    endDateTimeProperty: configProps.endDateTimeProperty,
    idProperty: configProps.idProperty,
    nameProperty: configProps.nameProperty,
    firstDay: configProps.firstDay,
    clockFormat: configProps.clockFormat,
    showWeekends: configProps.showWeekends
  };

  return (
    <>
      <MyOrgExtensionsCalendar {...props} />
    </>
  );
};
