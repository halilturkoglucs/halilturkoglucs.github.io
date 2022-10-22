import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import {
  BlipType,
  Radar,
  RadarQuadrantProps,
  useRadarState
} from '@undp_sdg_ai_lab/undp-radar';

import { WaitingForRadar } from '../../radar/components';
import { PopOverView } from '../views/PopOverView';

import '../views/RadarView.scss';
import './RadarMapView.scss';
import MapView from './MapView';

type Props = {
  loading: boolean;
  headingLabel?: string;
};

export const RadarMapView: React.FC<Props> = (props: Props) => {
  const {
    state: { techFilters, blips, isFiltered, filteredBlips }
  } = useRadarState();

  const radarProps: RadarQuadrantProps = {
    w: 320,
    h: 320
  };

  const [displayBlips, setDisplayBlips] = useState<BlipType[]>([]);

  useEffect(() => {
    let blipsToUse = blips;
    if (isFiltered) {
      blipsToUse = filteredBlips;
    }
    setDisplayBlips(blipsToUse);
  }, [blips, filteredBlips]);

  useEffect(() => {
    if (techFilters.length > 0) {
      let filteredBlipsAccordingToTechFilters = displayBlips.filter((blip) => {
        // blip.Technology and the techFilters sent by Radar state is different
        // e.g. blip.Technology=['Geographical Information Systems']
        // whereas techFilters=['geographical-information-systems']
        // as a workaround, try to convert blip.Technology to techFilter format
        let blipTechnology = blip.Technology.map((tf) => {
          return tf.toLowerCase().replaceAll(' ', '-');
        });
        return blipTechnology.some((t) => techFilters.includes(t));
      });
      console.log(filteredBlipsAccordingToTechFilters);
      setDisplayBlips(filteredBlipsAccordingToTechFilters);
    }
  }, [techFilters]);

  // END: Map related state

  return (
    <div className='radarMapView'>
      <div className='radarTitleContainer'>
        <Heading
          fontSize={30}
          color='DarkSlateGray'
          textAlign='center'
          p={15}
          paddingTop={15}
          className='radarTitle'
        >
          {props.headingLabel
            ? props.headingLabel
            : 'Frontier Technology Radar for Disaster Risk Reduction (FTR4DRR)'}
        </Heading>
        <div className='titleFiller' />
      </div>
      <Grid
        alignItems='center'
        templateColumns='repeat(auto-fit, minmax(400px, 1fr))'
        // columns={{ sm: 1, md: 1, lg: 3 }}
        // className='radarContainer'
      >
        {/*<GridItem colSpan={{sm: 1, md: 1, lg: 3}}>*/}
        {/*  <Heading*/}
        {/*    fontSize={30}*/}
        {/*    color='DarkSlateGray'*/}
        {/*    textAlign='center'*/}
        {/*    p={15}*/}
        {/*    paddingTop={15}*/}
        {/*    className='radarTitle'*/}
        {/*  >*/}
        {/*    {props.headingLabel ? props.headingLabel : 'Frontier Technology Radar for Disaster Risk Reduction (FTR4DRR)'}*/}
        {/*  </Heading>*/}
        {/*  <div className='titleFiller' />*/}
        {/*</GridItem>*/}
        <GridItem
          className='radarComponentsContainer'
          colSpan={{ sm: 1, md: 1, lg: 1 }}
        >
          <Box className='radarComponents sm-padding'>
            {props.loading && <WaitingForRadar size={radarProps.w + 'px'} />}
            {!props.loading && <Radar {...radarProps} />}
          </Box>
          <PopOverView />
        </GridItem>

        {/*<Box className='tabsComponents' {...TabOuterBoxProps}>*/}
        {/*  <Tabs*/}
        {/*    variant='enclosed'*/}
        {/*    index={tabIndex}*/}
        {/*    onChange={tabsChangeHandler}*/}
        {/*  >*/}
        {/*    <TabList>*/}
        {/*      <Tab as='h5'>Stages</Tab>*/}
        {/*      <Tab as='h5'>Technologies</Tab>*/}
        {/*      <Tab as='h5'>Project</Tab>*/}
        {/*    </TabList>*/}
        {/*    <TabPanels overflowY='auto'>*/}
        {/*      <TabPanel overflowY='auto'>*/}
        {/*        <ScrollableDiv maxHeight={720}>*/}
        {/*          <BlipListMui />*/}
        {/*        </ScrollableDiv>*/}
        {/*      </TabPanel>*/}
        {/*      <TabPanel overflowY='auto'>*/}
        {/*        <TechDescription />*/}
        {/*      </TabPanel>*/}
        {/*      <TabPanel overflowY='auto'>*/}
        {/*        <ScrollableDiv maxHeight={720}>*/}
        {/*          <BlipView />*/}
        {/*        </ScrollableDiv>*/}
        {/*      </TabPanel>*/}
        {/*    </TabPanels>*/}
        {/*  </Tabs>*/}
        {/*</Box>*/}

        <GridItem
          bg={'#fdfdfd'}
          mb={{ base: 0, md: 50 }}
          colSpan={{ sm: 1, md: 1, lg: 2 }}
        >
          <MapView blips={displayBlips} />
        </GridItem>

        {/*<GridItem bg={'#fdfdfd'} mb={{ base: 0, md: 50 }} colSpan={{sm: 1, md: 1, lg: 2}}>*/}
        {/*  {filteredTech.length !== 0 && (*/}
        {/*    <SearchResult filteredContent={filteredTech} />*/}
        {/*  )}*/}
        {/*</GridItem>*/}
      </Grid>
    </div>
  );
};
