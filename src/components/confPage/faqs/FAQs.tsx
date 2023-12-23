import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuBar from '../menuBar/MenuBar';
import { User } from '../../../utils/types';

interface FAQSectionProps {
  title: string;
  content: string;
}

const FAQSection = ({ title, content } : FAQSectionProps) => (
  <Box mb={3} boxShadow={2} p={4} borderRadius={3} bgcolor="white">
    <Typography variant="h6" fontWeight="bold" color="primary">
      {title}
    </Typography>
    <Typography variant="body1" color="textSecondary">
      {content}
    </Typography>
  </Box>
);

interface FAQsProps {
  user: User | null;
}

export default function FAQs({user} : FAQsProps) {
  return (
    <>
    <MenuBar user={user} />
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Align items in the center horizontally
      justifyContent: 'center', // Center content vertically
      padding: '20px',
      marginTop: '64px',
    }}>
    <Typography variant="h4">FAQs</Typography>
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
        }}
    >
      <FAQSection
        title="What is the HPAIR Conference?"
        content="The HPAIR Harvard Conference offers a wide variety of events. We have many sessions with leading speakers, which typically include a moderated conversation with our team and time for audience questions. Executive seminars are available as an additional add-on, allowing delegates to share an intimate conversation with a speaker in small group settings over lunch. We also offer our Impact Challenge, which remains one of our most popular events, providing delegates with the opportunity to work on real-world problems in small teams and mentored by industry professionals. Lastly, we have a wide-range of community events for the delegates, from networking sessions to I-Night, where delegates have the opportunity to showcase their talents on an international stage."
      />

      <FAQSection
        title="Who is speaking at the conference?"
        content="We are so excited for this year’s speaker lineup! Our team is hard at work securing the best speakers from around the world to come to Harvard this February! Speakers will be announced closer to the date of the event once they have been finalized."
      />

      <FAQSection
        title="When and where is the conference?"
        content="The 2024 Harvard Conference will take place from February 9-11, 2024, at Harvard University in Cambridge, Massachusetts."
      />

      <FAQSection
        title="What visa do I need to attend the conference?"
        content="A B1/B2 visitor visa is required to attend the conference for non-citizens of the United States. More information can be found here."
      />

      <FAQSection
        title="Will HPAIR sponsor my visa application?"
        content="As a student-run organization, our governmental purview is significantly limited — as such, we cannot advocate for expedited visa requests or granting of a visa on behalf of any individual. For most delegates who request supporting documentation to book a visa appointment, the letter of acceptance you will receive is sufficient documentation for the consulate or embassy."
      />

      <FAQSection
        title="How do I join the HPAIR team/be a volunteer?"
        content="Only currently enrolled Harvard College students may apply to join the HPAIR team."
      />

      <FAQSection
        title="I’m currently 17, but I will turn 18 by the time of the conference. Can I still apply?"
        content="Yes! As long as you will be 18 during the conference, we welcome you to submit an application."
      />

      <FAQSection
        title="What is covered by the conference fee?"
        content="All event programming and lunches are covered, as is dinner during the opening ceremony day. Though delegates are responsible for their own lodging and transportation costs, you can apply for scholarships to help reimburse some or potentially all of these costs."
      />

      <FAQSection
        title="Does HPAIR provide recommendation letters to delegates?"
        content="Due to the short nature and the high number of delegates at our conferences, we are unable to provide recommendation letters to individual delegates. While we believe individualized recommendation letters are important, we do not believe our team is adequately prepared to speak for each delegate’s personal abilities and potential."
      />
    </Box>
    </Box>
    </>
  );
};
