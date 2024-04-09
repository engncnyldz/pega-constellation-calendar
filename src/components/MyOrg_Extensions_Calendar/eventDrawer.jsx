import {
  Flex,
  Button,
  Drawer,
  Icon,
  Text,
  FieldValueList,
  useTheme,
  registerIcon,
  Configuration
} from '@pega/cosmos-react-core';

import * as timesIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/times.icon';
import { DrawerStyle } from './styles.js';

registerIcon(timesIcon);

function EventDrawer(props) {
  const { open, setOpen, event } = props;
  const useLocale = window.PCore.getEnvironmentInfo().getUseLocale();

  const clockFormat = Number(props.clockFormat);

  const theme = useTheme();

  if (event === null) return <div></div>;

  return (
    <Configuration theme={theme}>
      <Drawer
        as={DrawerStyle}
        open={open}
        onOuterClick={() => {
          setOpen(false);
        }}
        position='fixed'
        size='30rem'
        placement='right'
        transitionSpeed='0.25s'
        shadow={false}
      >
        <Flex container={{ direction: 'row', justify: 'end' }}>
          <Button
            style={{ padding: '15px' }}
            variant='simple'
            label='Close'
            icon
            compact
            onClick={() => setOpen(false)}
          >
            <Icon style={{ color: '#676767' }} name='times' />
          </Button>
        </Flex>
        <Flex
          container={{
            direction: 'column',
            justify: 'center',
            alignItems: 'center',
            gap: 2,
            pad: 4
          }}
        >
          <Text variant='h3'>{event.title}</Text>

          <FieldValueList
            variant='inline'
            style={{
              gap: 'normal'
            }}
            fields={[
              {
                id: 'start',
                name: 'Start Date Time',
                value: event.start
                  ? new Date(event.start).toLocaleString(useLocale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: clockFormat === 12
                    })
                  : ''
              },
              {
                id: 'end',
                name: 'End Date Time',
                value: event.end
                  ? new Date(event.end).toLocaleString(useLocale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: clockFormat === 12
                    })
                  : ''
              }
            ]}
          />
        </Flex>
      </Drawer>
    </Configuration>
  );
}
export default EventDrawer;
