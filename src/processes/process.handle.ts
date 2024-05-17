import { ProcessEntity } from 'src/entities/process.entity';
import { ProcessLogEntity } from 'src/entities/process.log.entity';
import { ProcessLogRepository } from 'src/repository/process.log.repository';
import { ProcessRepository } from 'src/repository/process.repository';

// Function to start the process
export async function startProcess(
  processRepository: ProcessRepository,
  logRepository: ProcessLogRepository,
  minute: number = 5,
): Promise<ProcessEntity> {
  // Define the interval (e.g., every 1 minute)
  const entity = getProcessEntity(minute, logRepository);
  return await processRepository.save(entity);
}

// Function to stop the process
export async function stopProcess(
  pid: number,
  processRepository: ProcessRepository,
) {
  // Find the process ID in the database and stop the corresponding interval
  clearInterval((await processRepository.findOneBy({ pid: pid })).processID);
  console.log('Process stopped:', pid);

  console.log('Process ID removed from database:', pid);
  // Delete the process ID from the database
  return await processRepository.delete({ pid: pid });
}

// Generate an 8-digit random number
function generateRandomNumber(): number {
  const min = 10000000;
  const max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get a process entity
function getProcessEntity(
  minute: number,
  processLogRepository: ProcessLogRepository,
) {
  // Define the interval (e.g., every 1 minute)
  const intervalInMilliseconds = minute * 10000; // 1 minute
  const pid = generateRandomNumber();

  // Perform tasks within the interval
  const intervalID = process(pid, intervalInMilliseconds, processLogRepository);
  const processEntity = new ProcessEntity();
  processEntity.pid = pid;
  processEntity.processID = Number(intervalID);
  return processEntity;
}

async function processWork(
  pid: number,
  processLogRepository: ProcessLogRepository,
) {
  const logEntity: ProcessLogEntity = new ProcessLogEntity();
  const processEntity = new ProcessEntity();
  processEntity.pid = pid;
  logEntity.processPid = pid;
  logEntity.logTime = new Date();
  processLogRepository.save(logEntity);
}

function process(
  pid: number,
  intervalInMilliseconds: number,
  processLogRepository: ProcessLogRepository,
) {
  return setInterval(
    (processId) => {
      console.log('Performing tasks with process ID:', processId);
      processWork(processId, processLogRepository).then(() => {
        console.log('Performing tasks with process ID:', processId);
      });
    },
    intervalInMilliseconds,
    pid,
  );
}
