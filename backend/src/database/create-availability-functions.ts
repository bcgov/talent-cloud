import { datasource } from "./datasource";

const functionSqlPrior = `create or replace function get_last_status_date_prior(personnel_id uuid, starting_date date, starting_status character varying(50))
  returns date
  language plpgsql
  as
  $$ 
  declare 
    personnelId uuid := personnel_id;
    initialStatus character varying(50) := starting_status;
    status character varying(50) := starting_status;
    lastdate date := starting_date;
  begin
    IF NOT EXISTS (SELECT * FROM public.availability WHERE personnel = personnelId AND date < lastdate)
    THEN raise notice 'No statuses before this';
    return starting_date;
    ELSE
      while status = initialStatus loop
        lastdate := lastdate -1;
        SELECT availability_type INTO status FROM public.availability WHERE personnel = personnelId AND date = lastdate ORDER BY date desc;
        raise notice 'Initial Status %', initialStatus;
        raise notice 'Status %', status;
        raise notice 'Last date %', lastdate;
      end loop;
    END IF;
    return lastdate + 1;
  end;
$$;
`;

const functionSqlAfter = `create or replace function get_last_status_date_after(personnel_id uuid, starting_date date, starting_status character varying(50))
  returns date
  language plpgsql
  as
  $$ 
  declare 
    personnelId uuid := personnel_id;
    initialStatus character varying(50) := starting_status;
    status character varying(50) := starting_status;
    lastdate date := starting_date;
  begin
    IF NOT EXISTS (SELECT * FROM public.availability WHERE personnel = personnelId AND date < lastdate)
    THEN raise notice 'No statuses before this';
    return starting_date;
    ELSE
      while status = initialStatus loop
        lastdate := lastdate + 1;
        SELECT availability_type INTO status FROM public.availability WHERE personnel = personnelId AND date = lastdate ORDER BY date desc;
        raise notice 'Initial Status %', initialStatus;
        raise notice 'Status %', status;
        raise notice 'Last date %', lastdate;
      end loop;
    END IF;
    return lastdate - 1;
  end;
  $$;
`;

const createFunctions = async () => {
  await datasource.initialize();
  await datasource.query(functionSqlPrior);
  await datasource.query(functionSqlAfter);
};

createFunctions();