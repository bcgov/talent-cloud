import { data } from './data';
import { FormAdapter } from '../src/form/adapter';
import { FormSubmissionDTO } from '../src/form/submission.dto';
import { CreatePersonnelDTO } from '../src/personnel';

describe('Form Parser', () => {
  describe('test form parsing', () => {
    it('should parse the form', async () => {
      // INSERT API CALL TO GET CHEFS DATA HERE TO REPLACE HARDCODED FORM DATA

      const compareFormDataWithParsedData = (target: CreatePersonnelDTO) => {
        expect(target).toBeInstanceOf(CreatePersonnelDTO);
        expect(target).toHaveProperty('emcr');
        expect(target).toHaveProperty('bcws');
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
      const parsedData = new FormAdapter(
        unparsedFormData.data.submission.submission.data,
        1,
      );

      compareFormDataWithParsedData(parsedData);
    });
  });
});
