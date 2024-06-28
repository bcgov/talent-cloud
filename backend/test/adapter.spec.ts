import { data } from './form-submission-data';
import { CreatePersonnelBcwsDTO } from '../src/bcws/dto';
import { CreatePersonnelEmcrDTO } from '../src/emcr/dto';
import { FormAdapter } from '../src/form/adapter';
import { FormSubmissionDTO } from '../src/form/submission.dto';
import { CreatePersonnelDTO } from '../src/personnel';

describe('Form Parser', () => {
  describe('test form parsing', () => {
    it('should parse the form', async () => {
      // INSERT API CALL TO GET CHEFS DATA HERE TO REPLACE HARDCODED FORM DATA

      const compareFormDataWithParsedData = (
        personnel: CreatePersonnelDTO,
        emcr?: CreatePersonnelEmcrDTO,
        bcws?: CreatePersonnelBcwsDTO,
      ) => {
        expect(personnel).toBeInstanceOf(CreatePersonnelDTO);
        emcr && expect(emcr).toBeInstanceOf(CreatePersonnelEmcrDTO);
        bcws && expect(bcws).toBeInstanceOf(CreatePersonnelBcwsDTO);
        // INSERT BETTER TESTS HERE
      };

      const unparsedFormData: FormSubmissionDTO = {
        data: {
          submission: {
            id: '1',
            formVersionId: '1',
            confirmationId: '1',
            draft: false,
            deleted: false,
            submission: {
              data: {
                emcr: data.emcr,
                bcws: data.bcws,
                personnel: data.personnel,
              },
            },
          },
        },
      };
      const { emcr, bcws, personnel } = new FormAdapter(
        unparsedFormData.data.submission.submission.data,
        1,
      );

      compareFormDataWithParsedData(personnel, emcr, bcws);
    });
  });
});
