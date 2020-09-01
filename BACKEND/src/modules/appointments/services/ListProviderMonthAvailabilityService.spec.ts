import FakeAppoinmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppoinmentsRepository: FakeAppoinmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppoinmentsRepository = new FakeAppoinmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppoinmentsRepository,
    );
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 8, 1, 8, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 8, 1, 10, 0, 0),
    });

    await fakeAppoinmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 8, 2, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 9,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: false },
        { day: 3, available: true },
      ]),
    );
  });
});
