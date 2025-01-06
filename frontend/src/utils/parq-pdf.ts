import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const PDF_VALUES = {
  general: {
    q1: {
      yes: {
        x: 537,
        y: 220,
      },
      no: {
        x: 564,
        y: 220,
      },
    },
    q2: {
      yes: {
        x: 537,
        y: 250,
      },
      no: {
        x: 564,
        y: 250,
      },
    },
    q3: {
      yes: {
        x: 537,
        y: 282,
      },
      no: {
        x: 564,
        y: 282,
      },
    },
    q4: {
      yes: {
        x: 537,
        y: 314,
      },
      no: {
        x: 564,
        y: 314,
      },
    },
    q5: {
      yes: {
        x: 537,
        y: 340,
      },
      no: {
        x: 564,
        y: 340,
      },
    },
    q6: {
      yes: {
        x: 537,
        y: 371,
      },
      no: {
        x: 564,
        y: 371,
      },
    },
    q7: {
      yes: {
        x: 537,
        y: 405,
      },
      no: {
        x: 564,
        y: 405,
      },
    },
  },
  followUpOne: {
    q1: {
      no: {
        x: 414,
        y: 106,
      },
    },
    q2: {
      no: {
        x: 415,
        y: 227,
      },
    },
    q3: {
      no: {
        x: 414,
        y: 331,
      },
    },
    q4: {
      no: {
        x: 414,
        y: 506,
      },
    },
    q5: {
      no: {
        x: 414,
        y: 637,
      },
    },
  },
  followUpOneSubquestions: {
    q1_1: {
      yes: {
        x: 525,
        y: 124,
      },
      no: {
        x: 554,
        y: 124,
      },
    },
    q1_2: {
      yes: {
        x: 525,
        y: 158,
      },
      no: {
        x: 554,
        y: 158,
      },
    },
    q1_3: {
      yes: {
        x: 525,
        y: 186,
      },
      no: {
        x: 554,
        y: 186,
      },
    },
    q2_1: {
      yes: {
        x: 525,
        y: 249,
      },
      no: {
        x: 554,
        y: 249,
      },
    },
    q2_2: {
      yes: {
        x: 525,
        y: 274,
      },
      no: {
        x: 554,
        y: 274,
      },
    },
    q3_1: {
      yes: {
        x: 525,
        y: 354,
      },
      no: {
        x: 554,
        y: 354,
      },
    },
    q3_2: {
      yes: {
        x: 525,
        y: 382,
      },
      no: {
        x: 554,
        y: 382,
      },
    },
    q3_3: {
      yes: {
        x: 525,
        y: 407,
      },
      no: {
        x: 554,
        y: 407,
      },
    },
    q3_4: {
      yes: {
        x: 525,
        y: 429,
      },
      no: {
        x: 554,
        y: 429,
      },
    },
    q3_5: {
      yes: {
        x: 525,
        y: 452,
      },
      no: {
        x: 554,
        y: 452,
      },
    },
    q4_1: {
      yes: {
        x: 525,
        y: 527,
      },
      no: {
        x: 554,
        y: 527,
      },
    },
    q4_2: {
      yes: {
        x: 525,
        y: 547,
      },
      no: {
        x: 554,
        y: 547,
      },
    },
    q4_3: {
      yes: {
        x: 525,
        y: 573,
      },
      no: {
        x: 554,
        y: 573,
      },
    },
    q5_1: {
      yes: {
        x: 525,
        y: 666,
      },
      no: {
        x: 554,
        y: 666,
      },
    },
    q5_2: {
      yes: {
        x: 525,
        y: 689,
      },
      no: {
        x: 554,
        y: 689,
      },
    },
  },
  followUpTwo: {
    q6: {
      no: {
        x: 416,
        y: 114,
      },
    },
    q7: {
      no: {
        x: 416,
        y: 259,
      },
    },
    q8: {
      no: {
        x: 416,
        y: 377,
      },
    },
    q9: {
      no: {
        x: 416,
        y: 483,
      },
    },
  },
  followUpTwoSubquestions: {
    q6_1: {
      yes: {
        x: 525,
        y: 135,
      },
      no: {
        x: 554,
        y: 135,
      },
    },
    q6_2: {
      yes: {
        x: 525,
        y: 163,
      },
      no: {
        x: 554,
        y: 163,
      },
    },
    q6_3: {
      yes: {
        x: 525,
        y: 192,
      },
      no: {
        x: 554,
        y: 192,
      },
    },
    q6_4: {
      yes: {
        x: 525,
        y: 219,
      },
      no: {
        x: 554,
        y: 219,
      },
    },
    q7_1: {
      yes: {
        x: 525,
        y: 279,
      },
      no: {
        x: 554,
        y: 279,
      },
    },
    q7_2: {
      yes: {
        x: 525,
        y: 308,
      },
      no: {
        x: 554,
        y: 308,
      },
    },
    q7_3: {
      yes: {
        x: 525,
        y: 334,
      },
      no: {
        x: 554,
        y: 334,
      },
    },
    q8_1: {
      yes: {
        x: 525,
        y: 400,
      },
      no: {
        x: 554,
        y: 400,
      },
    },
    q8_2: {
      yes: {
        x: 525,
        y: 421,
      },
      no: {
        x: 554,
        y: 421,
      },
    },
    q8_3: {
      yes: {
        x: 525,
        y: 440,
      },
      no: {
        x: 554,
        y: 440,
      },
    },
    q9_1: {
      yes: {
        x: 525,
        y: 508,
      },
      no: {
        x: 554,
        y: 508,
      },
    },
    q9_2: {
      yes: {
        x: 525,
        y: 532,
      },
      no: {
        x: 554,
        y: 532,
      },
    },
    q9_3: {
      yes: {
        x: 525,
        y: 552,
      },
      no: {
        x: 554,
        y: 552,
      },
    },
  },
};

export const fillInAndDownloadParQ = async ({
  general,
  followUps,
  fullName,
  dateSigned,
  witnessName,
}: {
  general: Record<string, boolean | null>;
  followUps: Record<string, boolean | null>;
  fullName: string;
  dateSigned: string;
  witnessName: string;
}) => {
  const url = new URL('/assets/parq-default.pdf', import.meta.url);
  const existingBytes = await fetch(url).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  const { height } = pages[0].getSize();

  Object.keys(general).forEach((key) => {
    const position =
      general[key] === true
        ? PDF_VALUES.general[key as keyof typeof PDF_VALUES.general].yes
        : PDF_VALUES.general[key as keyof typeof PDF_VALUES.general].no;
    pages[0].drawText('X', {
      x: position.x,
      y: height - position.y,
      size: 14,
      font: helveticaFont,
      color: rgb(0.1, 0.1, 0.1),
    });
  });

  Object.keys(followUps).forEach((key) => {
    let position;
    let page;
    let size;
    const firstFiveQuestions = ['q1', 'q2', 'q3', 'q4', 'q5'].some((substring) =>
      key.includes(substring),
    );
    if (firstFiveQuestions) {
      // Page 2
      page = 1;
      if (!key.includes('_')) {
        // No "yes" box
        if (followUps[key] === false) {
          size = 14;
          position =
            PDF_VALUES.followUpOne[key as keyof typeof PDF_VALUES.followUpOne].no;
        }
      } else {
        size = 10;
        if (followUps[key] === true) {
          position =
            PDF_VALUES.followUpOneSubquestions[
              key as keyof typeof PDF_VALUES.followUpOneSubquestions
            ].yes;
        } else if (followUps[key] === false) {
          position =
            PDF_VALUES.followUpOneSubquestions[
              key as keyof typeof PDF_VALUES.followUpOneSubquestions
            ].no;
        }
      }
    } else {
      // Page 3
      page = 2;
      if (!key.includes('_')) {
        // No "yes" box
        if (followUps[key] === false) {
          size = 14;
          position =
            PDF_VALUES.followUpTwo[key as keyof typeof PDF_VALUES.followUpTwo].no;
        }
      } else {
        size = 10;
        if (followUps[key] === true) {
          position =
            PDF_VALUES.followUpTwoSubquestions[
              key as keyof typeof PDF_VALUES.followUpTwoSubquestions
            ].yes;
        } else if (followUps[key] === false) {
          position =
            PDF_VALUES.followUpTwoSubquestions[
              key as keyof typeof PDF_VALUES.followUpTwoSubquestions
            ].no;
        }
      }
    }
    if (position) {
      pages[page].drawText('X', {
        x: position.x,
        y: height - position.y,
        size,
        font: helveticaFont,
        color: rgb(0.1, 0.1, 0.1),
      });
    }
  });

  pages[3].drawText(fullName, {
    x: 60,
    y: height - 580,
    size: 12,
    font: helveticaFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  pages[3].drawText(dateSigned, {
    x: 385,
    y: height - 580,
    size: 12,
    font: helveticaFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  pages[3].drawText(witnessName, {
    x: 400,
    y: height - 604,
    size: 12,
    font: helveticaFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  const fileName = 'parq.pdf';
  link.download = fileName;
  link.click();
};
