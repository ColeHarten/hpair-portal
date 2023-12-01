import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const FAQSection = ({ title, content }) => (
  <Box mb={3}>
    <Typography variant="h6" fontWeight="bold">
      {title}
    </Typography>
    <Typography variant="body1">{content}</Typography>
  </Box>
);

export default function FAQs(user) {
  return (
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
        title="How do I apply for a HPAIR conference?"
        content="HPAIR’s conference delegate application process has two rounds. The first is an online application, which can be found at apply.hpair.org. The application requires you to attach a resume and answer a few short-answer questions. If you are selected for the next round of applications, you will either be asked to submit a video interview or have a brief online (Zoom) interview with a HPAIR staff member. We look forward to reading your application soon!"
      />

      <FAQSection
        title="What is the application timeline?"
        content="Early-bird applications open October 15, 2023, and close November 15, 2023, at 11:59 pm EST. Regular applications will then open and close on December 15, 2023, at 11:59 pm EST."
      />

      <FAQSection
        title="When will final decisions be released?"
        content="Scholarship/Early Bird round applicants can expect to receive a decision on a rolling basis beginning in December. Regular Round applicants can expect to receive decisions by mid-January."
      />

      <FAQSection
        title="What are the advantages of applying during the early-bird round?"
        content="Early-bird applicants enjoy a discounted conference ticket price and have the opportunity to apply for our scholarship program! Early-bird applicants also receive their decisions earlier and have more time to apply for a visa to attend the conference."
      />

      <FAQSection
        title="How do I take advantage of the early-bird discount?"
        content="To receive the early-bird discount, you must apply in the early-bird round and register for the conference during early-bird registration."
      />

      <FAQSection
        title="Does HPAIR award scholarships? How do I apply for a scholarship?"
        content="Yes, HPAIR is committed to accessibility and proud to offer scholarships for all of our conferences. Applicants can only apply for HPAIR’s scholarship program during the early-bird round. To apply, applicants must answer an additional short-answer question on the application form and submit the documents listed in the application. Scholarship applications for HCONF 2024 close November 15, 2023. This is a strict deadline, so get your applications in quick! We will not be able to consider any scholarship applications after that deadline."
      />

      <FAQSection
        title="Are scholarships available to international students?"
        content="Yes, many of our scholarship recipients are international students!"
      />

      <FAQSection
        title="Is the scholarship merit-based or need-based?"
        content="Scholarships are merit-based, although we do try to take financial need into consideration. We encourage all applicants to apply for our scholarship program, and practice need-blind admissions: applying for a scholarship will not affect your candidacy for the conference!"
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
  );
};
